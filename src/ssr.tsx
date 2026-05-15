import React from "react";
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

export default createStartHandler(defaultStreamHandler);
