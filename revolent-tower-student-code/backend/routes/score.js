const express = require("express");
const dynamodb = require("../util/dynamodb");
const router = express.Router();
const { body, validationResult, param } = require("express-validator");
const { TABLE_NAME, GAME_NAME } = require("../util/config");

router.post(
  "/",
  body("email").isEmail().withMessage("email is required and must be valid"),
  body("score")
    .isNumeric()
    .withMessage("score is required and must be a number"),
  body("fullName").not().isEmpty().withMessage("fullName is required"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors
          .array()
          .map((item) => item.msg)
          .join(", ");
      }
      const params = {
        TableName: TABLE_NAME,
        Item: {
          email: req.body.email,
          fullName: req.body.fullName,
          score: req.body.score,
          lastUpdatedAt: new Date().toUTCString(),
          game_name: GAME_NAME,
        },
      };

      await dynamodb.put(params).promise();
      res.send({
        success: true,
      });
    } catch (error) {
      res.send({
        success: false,
        error: error?.toString(),
      });
    }
  }
);

router.get("/", async (_, res) => {
  var params = {
    TableName: TABLE_NAME,
    KeyConditionExpression: "game_name = :game_name",
    Limit: 10,
    ScanIndexForward: false, // true = ascending, false = descending
    ExpressionAttributeValues: {
      ":game_name": GAME_NAME,
    },
    IndexName: "score-index",
  };
  try {
    dynamodb.query(params, (err, data) => {
      if (err) {
        throw err;
      }
      const modifiedData = data.Items.map((item) => {
        delete item.email;
        return item;
      });
      res.send({
        success: true,
        data: modifiedData,
        count: data.Count,
        scannedCount: data.ScannedCount,
      });
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      error: error?.toString(),
    });
  }
});

router.get(
  "/:email",
  param("email").isEmail().withMessage("email must be valid"),
  async (req, res) => {
    try {
      const params = {
        TableName: TABLE_NAME,
        Key: {
          game_name: GAME_NAME,
          email: req.params.email,
        },
      };
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw errors
          .array()
          .map((item) => item.msg)
          .join(", ");
      }
      dynamodb.get(params, (err, data) => {
        if (err) {
          throw err;
        }
        res.send({
          success: true,
          data: data,
          count: data.Count,
          scannedCount: data.ScannedCount,
        });
      });
    } catch (error) {
      console.log(error);
      res.send({
        success: false,
        error: error?.toString(),
      });
    }
  }
);

module.exports = router;
