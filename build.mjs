#!/usr/bin/env zx

import { quotePowerShell } from "zx";

$.quote = quotePowerShell;

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 月份补零
const day = today.getDate().toString().padStart(2, "0"); // 日期补零

const layout = process.env.layout;
const formattedDate = `${year}/${month}/${day}`;
const title = formattedDate.replaceAll("/", "-");

let postPath = "";
switch (layout) {
  case "more":
    postPath = `livermore/${formattedDate}`;
    break;
  default:
    postPath = `daily/${formattedDate}`;
    break;
}

await $`hexo new ${layout} ${title} -p ${postPath}`.pipe(process.stdout);
