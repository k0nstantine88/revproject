import * as React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { textToColor } from "../util/textToColor";
import { Divider } from "@mui/material";

export default function AlignItemsList({ name, score, position }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "65px",
          alignItems: "center",
          borderRadius: "5px",
          padding: "0px 25px 0px 0px",
          marginTop: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 40,
              fontWeight: "600",
              fontSize: 18,
              color: "#2e2e3dde",
            }}
          >
            {position}.
          </div>
          <Avatar sx={{ bgcolor: textToColor(name), marginRight: 1 }}>
            {name[0].toUpperCase()}
          </Avatar>
          <div
            style={{
              fontWeight: "500",
              fontSize: 18,
              color: "#2e2e3dde",
              textTransform: "capitalize",
            }}
          >
            {name}
          </div>
        </div>
        <div style={{ fontWeight: "500", fontSize: 19, color: "#ac4bff" }}>
          {score >= 1000 ? `${(score / 1000).toFixed(1)}k` : score}
        </div>
      </div>
      <Divider />
    </>
  );
}
