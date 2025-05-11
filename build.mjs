#!/usr/bin/env zx

import { quotePowerShell } from "zx";

$.quote = quotePowerShell;

const today = new Date();
const year = today.getFullYear();
const month = (today.getMonth() + 1).toString().padStart(2, "0"); // 月份补零
const day = today.getDate().toString().padStart(2, "0"); // 日期补零
const formattedDate = `daily/${year}/${month}/${day}`;
const title = `${year}年${month}月${day}日`;

await $`hexo new daily ${title} -p ${formattedDate}`.pipe(process.stdout);
