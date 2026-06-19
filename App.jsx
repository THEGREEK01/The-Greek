import { useState, useEffect } from "react";

const TRAINER_PIN = "030410";
const ASSISTANT_PIN = "017235";
const EMAILJS_SERVICE_ID = "service_i6rsgam";
const EMAILJS_TEMPLATE_ID = "template_iz4I63I";
const EMAILJS_PUBLIC_KEY = "sqaNe63TyoTii8GHk";

const WORKING_HOURS = { weekday:{start:6,end:21}, weekend:{start:7,end:14} };
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const DAYS_FULL = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const BOOKED_EVENTS = [
  { start: "2026-06-08T06:00:00+02:00", end: "2026-06-08T07:00:00+02:00" },
  { start: "2026-06-08T07:00:00+02:00", end: "2026-06-08T08:00:00+02:00" },
  { start: "2026-06-08T08:00:00+02:00", end: "2026-06-08T08:30:00+02:00" },
  { start: "2026-06-08T09:30:00+02:00", end: "2026-06-08T10:30:00+02:00" },
  { start: "2026-06-08T10:30:00+02:00", end: "2026-06-08T11:30:00+02:00" },
  { start: "2026-06-08T11:30:00+02:00", end: "2026-06-08T12:30:00+02:00" },
  { start: "2026-06-08T13:00:00+02:00", end: "2026-06-08T14:00:00+02:00" },
  { start: "2026-06-08T15:00:00+02:00", end: "2026-06-08T16:00:00+02:00" },
  { start: "2026-06-08T15:15:00+02:00", end: "2026-06-08T16:15:00+02:00" },
  { start: "2026-06-08T16:00:00+02:00", end: "2026-06-08T17:00:00+02:00" },
  { start: "2026-06-08T17:00:00+02:00", end: "2026-06-08T18:00:00+02:00" },
  { start: "2026-06-08T18:00:00+02:00", end: "2026-06-08T19:00:00+02:00" },
  { start: "2026-06-09T06:00:00+02:00", end: "2026-06-09T07:00:00+02:00" },
  { start: "2026-06-09T07:00:00+02:00", end: "2026-06-09T08:00:00+02:00" },
  { start: "2026-06-09T08:30:00+02:00", end: "2026-06-09T09:30:00+02:00" },
  { start: "2026-06-09T09:30:00+02:00", end: "2026-06-09T10:30:00+02:00" },
  { start: "2026-06-09T13:00:00+02:00", end: "2026-06-09T14:00:00+02:00" },
  { start: "2026-06-09T14:00:00+02:00", end: "2026-06-09T15:00:00+02:00" },
  { start: "2026-06-09T15:00:00+02:00", end: "2026-06-09T16:00:00+02:00" },
  { start: "2026-06-09T18:00:00+02:00", end: "2026-06-09T19:00:00+02:00" },
  { start: "2026-06-10T06:00:00+02:00", end: "2026-06-10T07:00:00+02:00" },
  { start: "2026-06-10T07:00:00+02:00", end: "2026-06-10T08:00:00+02:00" },
  { start: "2026-06-10T07:30:00+02:00", end: "2026-06-10T08:30:00+02:00" },
  { start: "2026-06-10T09:30:00+02:00", end: "2026-06-10T10:30:00+02:00" },
  { start: "2026-06-10T10:30:00+02:00", end: "2026-06-10T11:30:00+02:00" },
  { start: "2026-06-10T13:00:00+02:00", end: "2026-06-10T14:00:00+02:00" },
  { start: "2026-06-10T14:00:00+02:00", end: "2026-06-10T15:00:00+02:00" },
  { start: "2026-06-10T15:00:00+02:00", end: "2026-06-10T16:00:00+02:00" },
  { start: "2026-06-10T16:00:00+02:00", end: "2026-06-10T17:00:00+02:00" },
  { start: "2026-06-10T18:00:00+02:00", end: "2026-06-10T19:00:00+02:00" },
  { start: "2026-06-11T07:00:00+02:00", end: "2026-06-11T08:00:00+02:00" },
  { start: "2026-06-11T08:30:00+02:00", end: "2026-06-11T09:30:00+02:00" },
  { start: "2026-06-11T09:30:00+02:00", end: "2026-06-11T10:30:00+02:00" },
  { start: "2026-06-11T12:00:00+02:00", end: "2026-06-11T12:30:00+02:00" },
  { start: "2026-06-11T13:00:00+02:00", end: "2026-06-11T14:00:00+02:00" },
  { start: "2026-06-11T14:00:00+02:00", end: "2026-06-11T15:00:00+02:00" },
  { start: "2026-06-11T15:00:00+02:00", end: "2026-06-11T16:00:00+02:00" },
  { start: "2026-06-11T16:00:00+02:00", end: "2026-06-11T17:00:00+02:00" },
  { start: "2026-06-11T17:00:00+02:00", end: "2026-06-11T18:00:00+02:00" },
  { start: "2026-06-11T18:00:00+02:00", end: "2026-06-11T19:00:00+02:00" },
  { start: "2026-06-12T06:00:00+02:00", end: "2026-06-12T07:00:00+02:00" },
  { start: "2026-06-12T07:00:00+02:00", end: "2026-06-12T08:00:00+02:00" },
  { start: "2026-06-12T08:00:00+02:00", end: "2026-06-12T09:00:00+02:00" },
  { start: "2026-06-12T09:00:00+02:00", end: "2026-06-12T10:00:00+02:00" },
  { start: "2026-06-12T10:00:00+02:00", end: "2026-06-12T11:00:00+02:00" },
  { start: "2026-06-12T15:00:00+02:00", end: "2026-06-12T16:00:00+02:00" },
  { start: "2026-06-12T16:00:00+02:00", end: "2026-06-12T17:00:00+02:00" },
  { start: "2026-06-12T17:00:00+02:00", end: "2026-06-12T18:00:00+02:00" },
  { start: "2026-06-13T10:00:00+02:00", end: "2026-06-13T11:00:00+02:00" },
  { start: "2026-06-15T06:00:00+02:00", end: "2026-06-15T07:00:00+02:00" },
  { start: "2026-06-15T07:00:00+02:00", end: "2026-06-15T08:00:00+02:00" },
  { start: "2026-06-15T09:30:00+02:00", end: "2026-06-15T10:30:00+02:00" },
  { start: "2026-06-15T10:30:00+02:00", end: "2026-06-15T11:30:00+02:00" },
  { start: "2026-06-15T11:30:00+02:00", end: "2026-06-15T12:30:00+02:00" },
  { start: "2026-06-15T14:00:00+02:00", end: "2026-06-15T15:00:00+02:00" },
  { start: "2026-06-15T15:00:00+02:00", end: "2026-06-15T16:00:00+02:00" },
  { start: "2026-06-15T16:00:00+02:00", end: "2026-06-15T17:00:00+02:00" },
  { start: "2026-06-15T17:00:00+02:00", end: "2026-06-15T18:00:00+02:00" },
  { start: "2026-06-15T18:00:00+02:00", end: "2026-06-15T19:00:00+02:00" },
  { start: "2026-06-15T19:00:00+02:00", end: "2026-06-15T20:00:00+02:00" },
  { start: "2026-06-16T06:00:00+02:00", end: "2026-06-16T07:00:00+02:00" },
  { start: "2026-06-16T07:00:00+02:00", end: "2026-06-16T08:00:00+02:00" },
  { start: "2026-06-16T08:30:00+02:00", end: "2026-06-16T09:30:00+02:00" },
  { start: "2026-06-16T09:30:00+02:00", end: "2026-06-16T10:30:00+02:00" },
  { start: "2026-06-16T10:30:00+02:00", end: "2026-06-16T11:30:00+02:00" },
  { start: "2026-06-16T12:00:00+02:00", end: "2026-06-16T13:00:00+02:00" },
  { start: "2026-06-16T15:00:00+02:00", end: "2026-06-16T16:00:00+02:00" },
  { start: "2026-06-16T16:00:00+02:00", end: "2026-06-16T17:00:00+02:00" },
  { start: "2026-06-16T17:00:00+02:00", end: "2026-06-16T18:00:00+02:00" },
  { start: "2026-06-16T18:00:00+02:00", end: "2026-06-16T19:00:00+02:00" },
  { start: "2026-06-17T06:00:00+02:00", end: "2026-06-17T07:00:00+02:00" },
  { start: "2026-06-17T07:30:00+02:00", end: "2026-06-17T08:30:00+02:00" },
  { start: "2026-06-17T08:00:00+02:00", end: "2026-06-17T09:00:00+02:00" },
  { start: "2026-06-17T09:30:00+02:00", end: "2026-06-17T10:30:00+02:00" },
  { start: "2026-06-17T10:30:00+02:00", end: "2026-06-17T11:30:00+02:00" },
  { start: "2026-06-17T14:00:00+02:00", end: "2026-06-17T15:00:00+02:00" },
  { start: "2026-06-17T15:00:00+02:00", end: "2026-06-17T16:00:00+02:00" },
  { start: "2026-06-17T16:00:00+02:00", end: "2026-06-17T17:00:00+02:00" },
  { start: "2026-06-18T06:00:00+02:00", end: "2026-06-18T07:00:00+02:00" },
  { start: "2026-06-18T07:00:00+02:00", end: "2026-06-18T08:00:00+02:00" },
  { start: "2026-06-18T08:30:00+02:00", end: "2026-06-18T09:30:00+02:00" },
  { start: "2026-06-18T09:30:00+02:00", end: "2026-06-18T10:30:00+02:00" },
  { start: "2026-06-18T10:30:00+02:00", end: "2026-06-18T11:30:00+02:00" },
  { start: "2026-06-18T12:00:00+02:00", end: "2026-06-18T13:00:00+02:00" },
  { start: "2026-06-18T13:00:00+02:00", end: "2026-06-18T14:00:00+02:00" },
  { start: "2026-06-18T14:00:00+02:00", end: "2026-06-18T15:00:00+02:00" },
  { start: "2026-06-18T15:00:00+02:00", end: "2026-06-18T16:00:00+02:00" },
  { start: "2026-06-18T16:00:00+02:00", end: "2026-06-18T17:00:00+02:00" },
  { start: "2026-06-18T17:00:00+02:00", end: "2026-06-18T18:00:00+02:00" },
  { start: "2026-06-18T18:00:00+02:00", end: "2026-06-18T19:00:00+02:00" },
  { start: "2026-06-19T06:00:00+02:00", end: "2026-06-19T07:00:00+02:00" },
  { start: "2026-06-19T07:00:00+02:00", end: "2026-06-19T08:00:00+02:00" },
  { start: "2026-06-19T08:00:00+02:00", end: "2026-06-19T09:00:00+02:00" },
  { start: "2026-06-19T09:00:00+02:00", end: "2026-06-19T10:00:00+02:00" },
  { start: "2026-06-19T10:00:00+02:00", end: "2026-06-19T11:00:00+02:00" },
  { start: "2026-06-19T11:00:00+02:00", end: "2026-06-19T12:00:00+02:00" },
  { start: "2026-06-19T15:00:00+02:00", end: "2026-06-19T16:00:00+02:00" },
  { start: "2026-06-20T09:00:00+02:00", end: "2026-06-20T10:00:00+02:00" },
  { start: "2026-06-20T10:00:00+02:00", end: "2026-06-20T11:00:00+02:00" },
  { start: "2026-06-21T13:00:00+02:00", end: "2026-06-21T14:00:00+02:00" },
  { start: "2026-06-22T06:00:00+02:00", end: "2026-06-22T07:00:00+02:00" },
  { start: "2026-06-22T07:00:00+02:00", end: "2026-06-22T08:00:00+02:00" },
  { start: "2026-06-22T09:30:00+02:00", end: "2026-06-22T10:30:00+02:00" },
  { start: "2026-06-22T10:30:00+02:00", end: "2026-06-22T11:30:00+02:00" },
  { start: "2026-06-22T15:00:00+02:00", end: "2026-06-22T16:00:00+02:00" },
  { start: "2026-06-22T17:00:00+02:00", end: "2026-06-22T18:00:00+02:00" },
  { start: "2026-06-22T18:00:00+02:00", end: "2026-06-22T19:00:00+02:00" },
  { start: "2026-06-23T06:00:00+02:00", end: "2026-06-23T07:00:00+02:00" },
  { start: "2026-06-23T07:00:00+02:00", end: "2026-06-23T08:00:00+02:00" },
  { start: "2026-06-23T08:30:00+02:00", end: "2026-06-23T09:30:00+02:00" },
  { start: "2026-06-23T09:30:00+02:00", end: "2026-06-23T10:30:00+02:00" },
  { start: "2026-06-23T18:00:00+02:00", end: "2026-06-23T19:00:00+02:00" },
  { start: "2026-06-24T06:00:00+02:00", end: "2026-06-24T07:00:00+02:00" },
  { start: "2026-06-24T07:30:00+02:00", end: "2026-06-24T08:30:00+02:00" },
  { start: "2026-06-24T09:30:00+02:00", end: "2026-06-24T10:30:00+02:00" },
  { start: "2026-06-24T16:00:00+02:00", end: "2026-06-24T17:00:00+02:00" },
  { start: "2026-06-25T06:00:00+02:00", end: "2026-06-25T07:00:00+02:00" },
  { start: "2026-06-25T07:00:00+02:00", end: "2026-06-25T08:00:00+02:00" },
  { start: "2026-06-25T08:30:00+02:00", end: "2026-06-25T09:30:00+02:00" },
  { start: "2026-06-25T09:30:00+02:00", end: "2026-06-25T10:30:00+02:00" },
  { start: "2026-06-25T14:00:00+02:00", end: "2026-06-25T15:00:00+02:00" },
  { start: "2026-06-25T15:00:00+02:00", end: "2026-06-25T16:00:00+02:00" },
  { start: "2026-06-25T18:00:00+02:00", end: "2026-06-25T19:00:00+02:00" },
  { start: "2026-06-26T06:00:00+02:00", end: "2026-06-26T07:00:00+02:00" },
  { start: "2026-06-26T07:00:00+02:00", end: "2026-06-26T08:00:00+02:00" },
  { start: "2026-06-26T08:00:00+02:00", end: "2026-06-26T09:00:00+02:00" },
  { start: "2026-06-26T09:00:00+02:00", end: "2026-06-26T10:00:00+02:00" },
  { start: "2026-06-26T15:00:00+02:00", end: "2026-06-26T16:00:00+02:00" },
  { start: "2026-06-29T06:00:00+02:00", end: "2026-06-29T07:00:00+02:00" },
  { start: "2026-06-29T07:00:00+02:00", end: "2026-06-29T08:00:00+02:00" },
  { start: "2026-06-29T09:30:00+02:00", end: "2026-06-29T10:30:00+02:00" },
  { start: "2026-06-29T10:30:00+02:00", end: "2026-06-29T11:30:00+02:00" },
  { start: "2026-06-29T15:00:00+02:00", end: "2026-06-29T16:00:00+02:00" },
  { start: "2026-06-29T18:00:00+02:00", end: "2026-06-29T19:00:00+02:00" },
  { start: "2026-06-30T06:00:00+02:00", end: "2026-06-30T07:00:00+02:00" },
  { start: "2026-06-30T07:00:00+02:00", end: "2026-06-30T08:00:00+02:00" },
  { start: "2026-06-30T08:30:00+02:00", end: "2026-06-30T09:30:00+02:00" },
  { start: "2026-06-30T09:30:00+02:00", end: "2026-06-30T10:30:00+02:00" },
  { start: "2026-06-30T18:00:00+02:00", end: "2026-06-30T19:00:00+02:00" },
  { start: "2026-07-01T06:00:00+02:00", end: "2026-07-01T07:00:00+02:00" },
  { start: "2026-07-01T07:30:00+02:00", end: "2026-07-01T08:30:00+02:00" },
  { start: "2026-07-01T09:30:00+02:00", end: "2026-07-01T10:30:00+02:00" },
  { start: "2026-07-01T16:00:00+02:00", end: "2026-07-01T17:00:00+02:00" },
  { start: "2026-07-02T06:00:00+02:00", end: "2026-07-02T07:00:00+02:00" },
  { start: "2026-07-02T07:00:00+02:00", end: "2026-07-02T08:00:00+02:00" },
  { start: "2026-07-02T08:30:00+02:00", end: "2026-07-02T09:30:00+02:00" },
  { start: "2026-07-02T09:30:00+02:00", end: "2026-07-02T10:30:00+02:00" },
  { start: "2026-07-02T14:00:00+02:00", end: "2026-07-02T15:00:00+02:00" },
  { start: "2026-07-02T15:00:00+02:00", end: "2026-07-02T16:00:00+02:00" },
  { start: "2026-07-02T18:00:00+02:00", end: "2026-07-02T19:00:00+02:00" },
  { start: "2026-07-03T06:00:00+02:00", end: "2026-07-03T07:00:00+02:00" },
  { start: "2026-07-03T07:00:00+02:00", end: "2026-07-03T08:00:00+02:00" },
  { start: "2026-07-03T08:00:00+02:00", end: "2026-07-03T09:00:00+02:00" },
  { start: "2026-07-03T09:00:00+02:00", end: "2026-07-03T10:00:00+02:00" },
  { start: "2026-07-03T15:00:00+02:00", end: "2026-07-03T16:00:00+02:00" },
  { start: "2026-07-06T06:00:00+02:00", end: "2026-07-06T07:00:00+02:00" },
  { start: "2026-07-06T07:00:00+02:00", end: "2026-07-06T08:00:00+02:00" },
  { start: "2026-07-06T09:30:00+02:00", end: "2026-07-06T10:30:00+02:00" },
  { start: "2026-07-06T10:30:00+02:00", end: "2026-07-06T11:30:00+02:00" },
  { start: "2026-07-06T15:00:00+02:00", end: "2026-07-06T16:00:00+02:00" },
  { start: "2026-07-06T18:00:00+02:00", end: "2026-07-06T19:00:00+02:00" },
  { start: "2026-07-07T06:00:00+02:00", end: "2026-07-07T07:00:00+02:00" },
  { start: "2026-07-07T07:00:00+02:00", end: "2026-07-07T08:00:00+02:00" },
  { start: "2026-07-07T08:30:00+02:00", end: "2026-07-07T09:30:00+02:00" },
  { start: "2026-07-07T09:30:00+02:00", end: "2026-07-07T10:30:00+02:00" },
  { start: "2026-07-07T18:00:00+02:00", end: "2026-07-07T19:00:00+02:00" },
  { start: "2026-07-08T06:00:00+02:00", end: "2026-07-08T07:00:00+02:00" },
  { start: "2026-07-08T07:30:00+02:00", end: "2026-07-08T08:30:00+02:00" },
  { start: "2026-07-08T09:30:00+02:00", end: "2026-07-08T10:30:00+02:00" },
  { start: "2026-07-08T16:00:00+02:00", end: "2026-07-08T17:00:00+02:00" },
  { start: "2026-07-09T06:00:00+02:00", end: "2026-07-09T07:00:00+02:00" },
  { start: "2026-07-09T07:00:00+02:00", end: "2026-07-09T08:00:00+02:00" },
  { start: "2026-07-09T08:30:00+02:00", end: "2026-07-09T09:30:00+02:00" },
  { start: "2026-07-09T09:30:00+02:00", end: "2026-07-09T10:30:00+02:00" },
  { start: "2026-07-09T14:00:00+02:00", end: "2026-07-09T15:00:00+02:00" },
  { start: "2026-07-09T15:00:00+02:00", end: "2026-07-09T16:00:00+02:00" },
  { start: "2026-07-09T18:00:00+02:00", end: "2026-07-09T19:00:00+02:00" },
  { start: "2026-07-10T06:00:00+02:00", end: "2026-07-10T07:00:00+02:00" },
  { start: "2026-07-10T07:00:00+02:00", end: "2026-07-10T08:00:00+02:00" },
  { start: "2026-07-10T08:00:00+02:00", end: "2026-07-10T09:00:00+02:00" },
  { start: "2026-07-10T09:00:00+02:00", end: "2026-07-10T10:00:00+02:00" },
  { start: "2026-07-10T15:00:00+02:00", end: "2026-07-10T16:00:00+02:00" },
  { start: "2026-07-13T06:00:00+02:00", end: "2026-07-13T07:00:00+02:00" },
  { start: "2026-07-13T07:00:00+02:00", end: "2026-07-13T08:00:00+02:00" },
  { start: "2026-07-13T09:30:00+02:00", end: "2026-07-13T10:30:00+02:00" },
  { start: "2026-07-13T10:30:00+02:00", end: "2026-07-13T11:30:00+02:00" },
  { start: "2026-07-13T15:00:00+02:00", end: "2026-07-13T16:00:00+02:00" },
  { start: "2026-07-13T18:00:00+02:00", end: "2026-07-13T19:00:00+02:00" },
  { start: "2026-07-14T06:00:00+02:00", end: "2026-07-14T07:00:00+02:00" },
  { start: "2026-07-14T07:00:00+02:00", end: "2026-07-14T08:00:00+02:00" },
  { start: "2026-07-14T08:30:00+02:00", end: "2026-07-14T09:30:00+02:00" },
  { start: "2026-07-14T09:30:00+02:00", end: "2026-07-14T10:30:00+02:00" },
  { start: "2026-07-14T18:00:00+02:00", end: "2026-07-14T19:00:00+02:00" },
  { start: "2026-07-15T06:00:00+02:00", end: "2026-07-15T07:00:00+02:00" },
  { start: "2026-07-15T07:30:00+02:00", end: "2026-07-15T08:30:00+02:00" },
  { start: "2026-07-15T09:30:00+02:00", end: "2026-07-15T10:30:00+02:00" },
  { start: "2026-07-15T16:00:00+02:00", end: "2026-07-15T17:00:00+02:00" },
  { start: "2026-07-16T06:00:00+02:00", end: "2026-07-16T07:00:00+02:00" },
  { start: "2026-07-16T07:00:00+02:00", end: "2026-07-16T08:00:00+02:00" },
  { start: "2026-07-16T08:30:00+02:00", end: "2026-07-16T09:30:00+02:00" },
  { start: "2026-07-16T09:30:00+02:00", end: "2026-07-16T10:30:00+02:00" },
  { start: "2026-07-16T14:00:00+02:00", end: "2026-07-16T15:00:00+02:00" },
  { start: "2026-07-16T15:00:00+02:00", end: "2026-07-16T16:00:00+02:00" },
  { start: "2026-07-16T18:00:00+02:00", end: "2026-07-16T19:00:00+02:00" },
  { start: "2026-07-17T06:00:00+02:00", end: "2026-07-17T07:00:00+02:00" },
  { start: "2026-07-17T07:00:00+02:00", end: "2026-07-17T08:00:00+02:00" },
  { start: "2026-07-17T08:00:00+02:00", end: "2026-07-17T09:00:00+02:00" },
  { start: "2026-07-17T09:00:00+02:00", end: "2026-07-17T10:00:00+02:00" },
  { start: "2026-07-17T15:00:00+02:00", end: "2026-07-17T16:00:00+02:00" },
  { start: "2026-07-20T06:00:00+02:00", end: "2026-07-20T07:00:00+02:00" },
  { start: "2026-07-20T07:00:00+02:00", end: "2026-07-20T08:00:00+02:00" },
  { start: "2026-07-20T09:30:00+02:00", end: "2026-07-20T10:30:00+02:00" },
  { start: "2026-07-20T10:30:00+02:00", end: "2026-07-20T11:30:00+02:00" },
  { start: "2026-07-20T15:00:00+02:00", end: "2026-07-20T16:00:00+02:00" },
  { start: "2026-07-20T18:00:00+02:00", end: "2026-07-20T19:00:00+02:00" },
  { start: "2026-07-21T06:00:00+02:00", end: "2026-07-21T07:00:00+02:00" },
  { start: "2026-07-21T07:00:00+02:00", end: "2026-07-21T08:00:00+02:00" },
  { start: "2026-07-21T08:30:00+02:00", end: "2026-07-21T09:30:00+02:00" },
  { start: "2026-07-21T09:30:00+02:00", end: "2026-07-21T10:30:00+02:00" },
  { start: "2026-07-21T18:00:00+02:00", end: "2026-07-21T19:00:00+02:00" },
  { start: "2026-07-22T06:00:00+02:00", end: "2026-07-22T07:00:00+02:00" },
  { start: "2026-07-22T07:30:00+02:00", end: "2026-07-22T08:30:00+02:00" },
  { start: "2026-07-22T09:30:00+02:00", end: "2026-07-22T10:30:00+02:00" },
  { start: "2026-07-22T16:00:00+02:00", end: "2026-07-22T17:00:00+02:00" },
  { start: "2026-07-23T06:00:00+02:00", end: "2026-07-23T07:00:00+02:00" },
  { start: "2026-07-23T07:00:00+02:00", end: "2026-07-23T08:00:00+02:00" },
  { start: "2026-07-23T08:30:00+02:00", end: "2026-07-23T09:30:00+02:00" },
  { start: "2026-07-23T09:30:00+02:00", end: "2026-07-23T10:30:00+02:00" },
  { start: "2026-07-23T14:00:00+02:00", end: "2026-07-23T15:00:00+02:00" },
  { start: "2026-07-23T15:00:00+02:00", end: "2026-07-23T16:00:00+02:00" },
  { start: "2026-07-23T18:00:00+02:00", end: "2026-07-23T19:00:00+02:00" },
  { start: "2026-07-24T06:00:00+02:00", end: "2026-07-24T07:00:00+02:00" },
  { start: "2026-07-24T07:00:00+02:00", end: "2026-07-24T08:00:00+02:00" },
];

// Logo SVG — faithful recreation of The Greek warrior silhouette
const LogoSVG = () => (
  <svg width="46" height="46" viewBox="0 0 200 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="#111"/>
    <path d="M108 18 C96 18 86 26 84 38 C82 50 88 60 100 64 C112 68 124 62 128 50 C132 38 124 22 108 18Z" fill="white"/>
    <path d="M100 64 C88 64 74 70 66 80 C58 90 54 104 56 116 C58 128 64 136 72 140 L68 180 L84 178 L86 160 L100 162 L114 160 L116 178 L132 180 L128 140 C136 136 142 128 144 116 C146 104 142 90 134 80 C126 70 112 64 100 64Z" fill="white"/>
    <path d="M72 140 C60 144 50 154 46 166 L56 168 L60 180 L68 180Z" fill="white"/>
    <path d="M128 140 C140 144 150 154 154 166 L144 168 L140 180 L132 180Z" fill="white"/>
    <text x="100" y="214" fontFamily="Georgia, serif" fontSize="18" fontWeight="400" letterSpacing="8" fill="white" textAnchor="middle">THE GREEK</text>
  </svg>
);


function getWeekRange(){
  const now = new Date();
  const day = now.getDay();
  const mon = new Date(now); mon.setDate(now.getDate() - (day===0?6:day-1)); mon.setHours(0,0,0,0);
  const sun = new Date(mon); sun.setDate(mon.getDate()+6); sun.setHours(23,59,59,999);
  return {mon, sun};
}
function getMonthRange(){
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth()+1, 0); end.setHours(23,59,59,999);
  return {start, end};
}
function countSessions(history, from, to){
  return (history||[]).filter(e=>{
    const parts = e.date.split("/");
    if(parts.length!==3) return false;
    const d = new Date(parseInt(parts[2]), parseInt(parts[1])-1, parseInt(parts[0]));
    return d>=from && d<=to;
  }).length;
}
function getUpcomingSessions(requests, bookedEvents){
  const now = new Date(); now.setHours(0,0,0,0);
  const end = new Date(now); end.setDate(now.getDate()+30);
  // From approved requests
  const fromReqs = requests
    .filter(r=>r.status==="approved")
    .map(r=>({name:r.name,phone:r.phone,dateISO:r.dateISO,date:r.date,time:r.time,timeEnd:r.timeEnd,source:"request"}))
    .filter(r=>{ const d=new Date(r.dateISO); return d>=now&&d<=end; });
  return fromReqs.sort((a,b)=>new Date(a.dateISO)-new Date(b.dateISO));
}
function isWeekend(d){const day=d.getDay();return day===0||day===6;}
function getHours(d){return isWeekend(d)?WORKING_HOURS.weekend:WORKING_HOURS.weekday;}
function formatTime(d){const h=d.getHours();return `${h<10?"0"+h:h}:00`;}
function formatDate(d){return `${DAYS_FULL[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;}

function generateSlots(date){
  const{start,end}=getHours(date);const slots=[];
  for(let h=start;h<end;h++){
    const s=new Date(date);s.setHours(h,0,0,0);
    const e=new Date(date);e.setHours(h+1,0,0,0);
    const booked=BOOKED_EVENTS.some(b=>new Date(b.start)<e&&new Date(b.end)>s);
    slots.push({time:s,endTime:e,key:s.toISOString(),booked});
  }
  return slots;
}

async function loadRequests(){try{const r=await window.storage.get("booking-requests");return r?JSON.parse(r.value):[];}catch{return[];}}
async function saveRequests(reqs){try{await window.storage.set("booking-requests",JSON.stringify(reqs));}catch{}}
async function loadClients(){try{const r=await window.storage.get("clients");return r?JSON.parse(r.value):[];}catch{return[];}}
async function saveClients(c){try{await window.storage.set("clients",JSON.stringify(c));}catch{}}

const EMPTY_CLIENT = {name:"",phone:"",email:"",birthday:"",address:"",emergencyContact:"",age:"",weight:"",height:"",bodyFat:"",familyInfo:"",medicalConditions:"",injuries:"",medications:"",allergies:"",fitnessGoal:"",experienceLevel:"",trainingProgram:"",sessionsPerWeek:"",preferredTime:"",notes:"",trainingHistory:[],totalSessions:0,status:"active",clientCode:""};

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Raleway:wght@300;400;500&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{--black:#080808;--deep:#0f0f0f;--card:#141414;--border:#222;--gold:#c9a84c;--gold-light:#e2c97e;--gold-dim:#7a6530;--red:#c0392b;--red-light:#e74c3c;--white:#f0ead6;--muted:#555;}
  ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#7a6530;}
  .fade{animation:fadeUp 0.35s ease forwards;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
  .btn-gold{background:linear-gradient(135deg,#c9a84c,#e2c97e);color:#080808;border:none;font-family:'Cinzel',serif;font-weight:700;letter-spacing:2px;cursor:pointer;transition:all 0.2s;text-transform:uppercase;}
  .btn-gold:hover:not(:disabled){filter:brightness(1.12);transform:translateY(-1px);}
  .btn-gold:disabled{opacity:0.35;cursor:default;}
  .btn-ghost{background:transparent;color:#c9a84c;border:1px solid #7a6530;font-family:'Cinzel',serif;letter-spacing:2px;cursor:pointer;transition:all 0.2s;text-transform:uppercase;}
  .btn-ghost:hover{border-color:#c9a84c;color:#e2c97e;}
  .btn-red{background:#c0392b;color:#fff;border:none;font-family:'Cinzel',serif;font-weight:600;letter-spacing:1px;cursor:pointer;transition:all 0.2s;}
  .btn-red:hover{background:#e74c3c;}
  .btn-green{background:#1a6b3c;color:#fff;border:none;font-family:'Cinzel',serif;font-weight:600;letter-spacing:1px;cursor:pointer;transition:all 0.2s;}
  .btn-green:hover{background:#22894e;}
  .slot{border:1px solid #222;background:#141414;color:#f0ead6;padding:14px 18px;text-align:left;width:100%;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-family:'Raleway',sans-serif;font-size:13px;border-radius:2px;transition:all 0.15s;margin-bottom:6px;}
  .slot:hover:not(:disabled){border-color:#c9a84c;background:#1a1a1a;}
  .slot:disabled{color:#2a2a2a;border-color:#111;cursor:default;}
  .cal-cell{background:transparent;border:1px solid #1a1a1a;color:#f0ead6;padding:10px 0;font-family:'Raleway',sans-serif;font-size:13px;border-radius:2px;cursor:pointer;transition:all 0.15s;text-align:center;}
  .cal-cell:hover:not(.past){border-color:#c9a84c;color:#e2c97e;}
  .cal-cell.today{border-color:#7a6530;}
  .cal-cell.selected{background:#c9a84c;color:#080808;border-color:#c9a84c;font-weight:700;}
  .cal-cell.past{color:#252525;cursor:default;border-color:#111;}
  .cal-cell.weekend{color:#7a6530;}
  .field-label{font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:#555;margin-bottom:6px;text-transform:uppercase;}
  .field input,.field textarea{width:100%;background:#0c0c0c;border:1px solid #222;color:#f0ead6;padding:11px 13px;font-family:'Raleway',sans-serif;font-size:13px;border-radius:2px;transition:border-color 0.2s;resize:none;}
  .field input:focus,.field textarea:focus{outline:none;border-color:#c9a84c;}
  .pin-dot{width:14px;height:14px;border-radius:50%;background:#222;border:1px solid #333;transition:all 0.2s;}
  .pin-dot.filled{background:#c9a84c;border-color:#c9a84c;box-shadow:0 0 8px rgba(201,168,76,0.5);}
  .card{background:#141414;border:1px solid #222;border-radius:2px;padding:16px;margin-bottom:10px;}
  .card.pending{border-left:3px solid #c9a84c;}
  .card.approved{border-left:3px solid #1a6b3c;}
  .card.rejected{border-left:3px solid #c0392b;}
  .tab-btn{flex:1;padding:11px 4px;background:transparent;color:#555;border:none;font-family:'Cinzel',serif;font-size:9px;letter-spacing:1px;cursor:pointer;text-transform:uppercase;transition:all 0.2s;}
  .tab-btn.active{background:#c9a84c;color:#080808;}
  .divider{height:1px;background:linear-gradient(90deg,#c9a84c,transparent);margin:14px 0;}
  .sec-title{font-family:'Cinzel',serif;font-size:9px;letter-spacing:3px;color:#c9a84c;display:flex;align-items:center;gap:10px;margin-bottom:12px;}
  .sec-line{flex:1;height:1px;background:#222;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}.pulse{animation:pulse 1.2s infinite;}
`;

export default function TheGreek(){
  const today=new Date();today.setHours(0,0,0,0);
  const [appMode,setAppMode]=useState("client"); // client | pinEntry | trainer | assistant
  const [pin,setPin]=useState("");
  const [pinError,setPinError]=useState(false);
  const [cView,setCView]=useState("calendar");
  const [currentMonth,setCurrentMonth]=useState(new Date(today.getFullYear(),today.getMonth(),1));
  const [selectedDate,setSelectedDate]=useState(null);
  const [selectedSlot,setSelectedSlot]=useState(null);
  const [clientForm,setClientForm]=useState({name:"",phone:""});
  const setF=f=>e=>setClientForm(p=>({...p,[f]:e.target.value}));
  const [submitting,setSubmitting]=useState(false);
  const [cancellingId,setCancellingId]=useState(null);
  const [portalView,setPortalView]=useState(null); // null | "login" | "portal"
  const [portalCode,setPortalCode]=useState("");
  const [portalClient,setPortalClient]=useState(null);
  const [portalError,setPortalError]=useState(false);
  const [clientSearch,setClientSearch]=useState("");
  const [requests,setRequests]=useState([]);
  const [clients,setClients]=useState([]);
  const [tView,setTView]=useState("requests");
  const [actionLoading,setActionLoading]=useState(null);
  const [selectedClient,setSelectedClient]=useState(null);
  const [editingClient,setEditingClient]=useState(null);
  const [newEntry,setNewEntry]=useState("");
  const [addingClient,setAddingClient]=useState(false);
  const [newClient,setNewClient]=useState({...EMPTY_CLIENT});

  useEffect(()=>{if(appMode==="trainer"){loadRequests().then(setRequests);loadClients().then(setClients);}},[appMode]);

  function handlePinDigit(d){
    if(pin.length>=6)return;
    const next=pin+d;setPin(next);setPinError(false);
    if(next.length===6){
      if(next===TRAINER_PIN){setAppMode("trainer");setPin("");}
      else if(next===ASSISTANT_PIN){setAppMode("assistant");setPin("");}
      else{setPinError(true);setTimeout(()=>setPin(""),700);}
    }
  }

  async function sendEmail(toEmail, toName, templateParams){
    try{
      await fetch("https://api.emailjs.com/api/v1.0/email/send",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          service_id:EMAILJS_SERVICE_ID,
          template_id:EMAILJS_TEMPLATE_ID,
          user_id:EMAILJS_PUBLIC_KEY,
          template_params:{to_email:toEmail,to_name:toName,...templateParams}
        })
      });
    }catch{}
  }

  async function notifyWaitlist(cancelledReq){
    const active = clients.filter(c=>c.status==="active"&&c.email&&c.email!==cancelledReq.email);
    const appUrl = window.location.href;
    for(const c of active){
      await sendEmail(c.email, c.name, {
        subject: "🏋️ Session Slot Just Opened — The Greek",
        message: `A training slot has just become available! Be the first to grab it.`,
        session_date: cancelledReq.date,
        session_time: `${cancelledReq.time} – ${cancelledReq.timeEnd}`,
        cancel_link: `Book now: ${appUrl}`,
      });
    }
  }

  async function submitRequest(){
    if(!clientForm.name.trim()||!clientForm.phone.trim())return;
    setSubmitting(true);
    const req={id:Date.now().toString(),name:clientForm.name,phone:clientForm.phone,date:formatDate(selectedDate),dateISO:selectedDate.toISOString(),time:formatTime(selectedSlot.time),timeEnd:formatTime(selectedSlot.endTime),slotKey:selectedSlot.key,status:"pending",submittedAt:new Date().toISOString()};
    const existing=await loadRequests();
    await saveRequests([...existing,req]);
    setClientForm({name:"",phone:""});setSelectedSlot(null);setCView("submitted");setSubmitting(false);
  }

  async function handleDecision(id,decision){
    setActionLoading(id+decision);
    const updated=requests.map(r=>r.id===id?{...r,status:decision}:r);
    await saveRequests(updated);setRequests(updated);
    const req=updated.find(r=>r.id===id);
    if(req?.email) await sendEmail(req.email, req.name, {
      subject: decision==="approved" ? "✓ Session Confirmed — The Greek" : "Session Request Update — The Greek",
      message: decision==="approved"
        ? `Your training session has been confirmed. See you there!`
        : `Unfortunately this slot is no longer available. Please request another time.`,
      session_date: req.date,
      session_time: `${req.time} – ${req.timeEnd}`,
      cancel_link: decision==="approved" ? `To cancel: reply to this email or contact your trainer.` : "",
    });
    if(decision==="approved"&&req){
      const existing=await loadClients();
      if(!existing.find(c=>c.phone===req.phone)){
        const nc={...EMPTY_CLIENT,id:Date.now().toString(),name:req.name,phone:req.phone,firstSession:req.date,lastSession:req.date,totalSessions:1,trainingHistory:[{date:req.date,time:req.time,notes:"First session booked"}]};
        const upd=[...existing,nc];await saveClients(upd);setClients(upd);
      }
    }
    setActionLoading(null);
  }

  async function saveClientEdits(){
    const updated=clients.map(c=>c.id===editingClient.id?editingClient:c);
    await saveClients(updated);setClients(updated);setSelectedClient(editingClient);setEditingClient(null);
  }




  async function handlePortalLogin(){
    if(!portalCode.trim())return;
    const allClients = await loadClients();
    const found = allClients.find(c=>c.clientCode&&c.clientCode.toUpperCase()===portalCode.trim().toUpperCase());
    if(found){
      setPortalClient(found);
      setPortalView("portal");
      setPortalError(false);
      setPortalCode("");
    } else {
      setPortalError(true);
      setTimeout(()=>setPortalError(false), 2000);
    }
  }

  async function handleClientCancel(reqId){
    const allReqs = await loadRequests();
    const req = allReqs.find(r=>r.id===reqId);
    if(!req)return;
    const updated = allReqs.map(r=>r.id===reqId?{...r,status:"cancelled"}:r);
    await saveRequests(updated);
    setRequests(updated);
    await notifyWaitlist(req);
    // Refresh portal client data
    const allClients = await loadClients();
    const refreshed = allClients.find(c=>c.id===portalClient.id);
    if(refreshed) setPortalClient(refreshed);
    setCView("cancelled");
    setPortalView(null);
  }
  async function cancelRequest(id){
    const req = requests.find(r=>r.id===id);
    if(!req)return;
    setActionLoading(id+"cancel");
    const updated = requests.map(r=>r.id===id?{...r,status:"cancelled"}:r);
    await saveRequests(updated);
    setRequests(updated);
    // Notify waitlist
    await notifyWaitlist(req);
    setActionLoading(null);
  }
  async function saveNewClient(){
    if(!newClient.name.trim()&&!newClient.phone.trim())return;
    const c={...newClient,id:Date.now().toString(),totalSessions:0,trainingHistory:[],firstSession:"",lastSession:"",status:"active"};
    const updated=[...clients,c];
    await saveClients(updated);setClients(updated);
    // Send welcome email if email and code are provided
    if(c.email&&c.clientCode){
      const appUrl = window.location.href;
      await sendEmail(c.email, c.name, {
        subject: "Welcome to The Greek Personal Training 🏋️",
        message: `Welcome! You have been added as a client at The Greek Personal Training.\n\nYour personal client code is: ${c.clientCode}\n\nUse this code to manage your bookings — view upcoming sessions, book new times, and cancel if needed.\n\nTo get started, visit the booking page and tap "Manage My Booking" then enter your code.`,
        session_date: "",
        session_time: "",
        cancel_link: `Booking page: ${appUrl}`,
      });
    }
    setNewClient({...EMPTY_CLIENT});setAddingClient(false);
  }
  async function addTrainingEntry(){
    if(!newEntry.trim())return;
    const entry={date:new Date().toLocaleDateString("en-GB"),notes:newEntry};
    const uc={...selectedClient,trainingHistory:[...(selectedClient.trainingHistory||[]),entry],lastSession:entry.date,totalSessions:(selectedClient.totalSessions||0)+1};
    const updated=clients.map(c=>c.id===selectedClient.id?uc:c);
    await saveClients(updated);setClients(updated);setSelectedClient(uc);setNewEntry("");
  }

  function buildCalendarDays(){
    const y=currentMonth.getFullYear(),m=currentMonth.getMonth();
    const fd=new Date(y,m,1).getDay(),tot=new Date(y,m+1,0).getDate();
    const cells=[];for(let i=0;i<fd;i++)cells.push(null);for(let d=1;d<=tot;d++)cells.push(new Date(y,m,d));return cells;
  }

  const slots=selectedDate?generateSlots(selectedDate):[];
  const pendingCount=requests.filter(r=>r.status==="pending").length;

  const FLD=({label,value,onChange,placeholder})=>(
    <div className="field"><div className="field-label">{label}</div><input value={value} onChange={onChange} placeholder={placeholder}/></div>
  );
  const TXA=({label,value,onChange,placeholder,rows=2})=>(
    <div className="field"><div className="field-label">{label}</div><textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder}/></div>
  );

  return(
    <div style={{minHeight:"100vh",background:"#080808",fontFamily:"'Raleway',sans-serif",color:"#f0ead6"}}>
      <style>{CSS}</style>

      {/* HEADER */}
      <div style={{background:"linear-gradient(180deg,#0f0f0f,#080808)",borderBottom:"1px solid #1a1a1a",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",position:"sticky",top:0,zIndex:100}}>
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <img src="https://i.imgur.com/wQnFMj2.jpg" alt="The Greek" style={{width:46,height:46,objectFit:"cover",borderRadius:2,border:"1px solid #7a6530",flexShrink:0}}/>
          <div>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:18,fontWeight:900,letterSpacing:4,color:"#c9a84c",lineHeight:1}}>THE GREEK</div>
            <div style={{fontSize:9,letterSpacing:3,color:"#555",marginTop:2}}>PERSONAL TRAINING</div>
          </div>
        </div>
        <button onClick={()=>(appMode==="trainer"||appMode==="assistant")?(setAppMode("client"),setCView("calendar"),setSelectedClient(null),setEditingClient(null)):setAppMode("pinEntry")}
          style={{background:"none",border:"1px solid #222",color:(appMode==="trainer"||appMode==="assistant")?"#c9a84c":"#444",fontSize:9,fontFamily:"'Cinzel',serif",letterSpacing:2,padding:"7px 12px",cursor:"pointer",borderRadius:2,position:"relative"}}>
          {(appMode==="trainer"||appMode==="assistant")?"← EXIT":"TRAINER"}
          {pendingCount>0&&appMode==="client"&&<span style={{position:"absolute",top:-6,right:-6,background:"#c0392b",color:"#fff",borderRadius:"50%",width:16,height:16,fontSize:9,display:"flex",alignItems:"center",justifyContent:"center"}}>{pendingCount}</span>}
        </button>
      </div>

      <div style={{maxWidth:480,margin:"0 auto",padding:"20px 18px 60px"}}>

        {/* PIN */}
        {appMode==="pinEntry"&&(
          <div className="fade" style={{textAlign:"center",paddingTop:40}}>
            <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:4,color:"#c9a84c",marginBottom:8}}>TRAINER ACCESS</div>
            <div style={{fontSize:10,color:"#555",letterSpacing:2,marginBottom:36}}>ENTER YOUR PIN</div>
            <div style={{display:"flex",gap:12,justifyContent:"center",marginBottom:36}}>
              {[0,1,2,3,4,5].map(i=><div key={i} className={"pin-dot"+(pin.length>i?" filled":"")} style={{background:pinError?"#c0392b":pin.length>i?"#c9a84c":"#222",borderColor:pinError?"#c0392b":pin.length>i?"#c9a84c":"#333"}}/>)}
            </div>
            {pinError&&<div style={{color:"#c0392b",fontSize:10,letterSpacing:2,marginBottom:16}}>INCORRECT PIN</div>}
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,maxWidth:240,margin:"0 auto"}}>
              {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((d,i)=>(
                <button key={i} onClick={()=>d==="⌫"?setPin(p=>p.slice(0,-1)):d!==""&&handlePinDigit(String(d))}
                  className={d!==""?"btn-ghost":""}
                  style={{padding:"17px",background:d===""?"transparent":"#141414",border:d===""?"none":"1px solid #222",color:"#f0ead6",fontSize:18,fontFamily:"'Raleway',sans-serif",borderRadius:2,cursor:d===""?"default":"pointer"}}>
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TRAINER */}
        {appMode==="trainer"&&(
          <div className="fade">
            <div style={{display:"flex",gap:0,marginBottom:20,border:"1px solid #222",borderRadius:2,overflow:"hidden"}}>
              {["upcoming","requests","clients","history"].map(v=>(
                <button key={v} onClick={()=>{setTView(v);setSelectedClient(null);setEditingClient(null);}} className={"tab-btn"+(tView===v?" active":"")}>
                  {v==="upcoming"?"UPCOMING":v==="requests"?`REQUESTS${pendingCount>0?` (${pendingCount})`:""}`:v.toUpperCase()}
                </button>
              ))}
            </div>

            {tView==="upcoming"&&(
              <div className="fade">
                {(()=>{
                  const sessions = getUpcomingSessions(requests, BOOKED_EVENTS);
                  if(sessions.length===0) return <div style={{textAlign:"center",padding:"50px 0",color:"#555",fontFamily:"'Cinzel',serif",letterSpacing:2,fontSize:10}}>NO UPCOMING SESSIONS</div>;
                  let lastDate = null;
                  return sessions.map((s,i)=>{
                    const showDate = s.date !== lastDate;
                    lastDate = s.date;
                    return(
                      <div key={i}>
                        {showDate&&<div style={{fontFamily:"'Cinzel',serif",fontSize:10,color:"#c9a84c",letterSpacing:3,marginTop:i>0?16:0,marginBottom:8,paddingBottom:6,borderBottom:"1px solid #1a1a1a"}}>{s.date.toUpperCase()}</div>}
                        <div style={{background:"#141414",border:"1px solid #222",borderLeft:"3px solid #1a6b3c",padding:"12px 14px",borderRadius:2,marginBottom:6}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                              <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:"#f0ead6"}}>{s.name}</div>
                              <div style={{fontSize:11,color:"#555",marginTop:2}}>📞 {s.phone}</div>
                            </div>
                            <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:"#2ecc71",textAlign:"right"}}>
                              <div>{s.time}</div>
                              <div style={{fontSize:10,color:"#555"}}>–{s.timeEnd}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            )}

            {tView==="requests"&&(
              <div>
                {requests.filter(r=>r.status==="pending").length===0
                  ?<div style={{textAlign:"center",padding:"50px 0",color:"#555",fontFamily:"'Cinzel',serif",letterSpacing:2,fontSize:10}}>NO PENDING REQUESTS</div>
                  :requests.filter(r=>r.status==="pending").map(req=>(
                  <div key={req.id} className="card pending">
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:10}}>
                      <div>
                        <div style={{fontFamily:"'Cinzel',serif",fontSize:15,color:"#c9a84c",fontWeight:600}}>{req.name}</div>
                        <div style={{fontSize:11,color:"#555",marginTop:3}}>{req.date}</div>
                        <div style={{fontSize:12,marginTop:2}}>{req.time} – {req.timeEnd}</div>
                      </div>
                      <div style={{fontSize:9,letterSpacing:2,color:"#7a6530",fontFamily:"'Cinzel',serif"}}>PENDING</div>
                    </div>
                    <div style={{fontSize:11,color:"#888",marginBottom:12}}>📞 {req.phone}</div>
                    <div style={{display:"flex",gap:8}}>
                      <button className="btn-green" onClick={()=>handleDecision(req.id,"approved")} style={{flex:1,padding:"10px",fontSize:10,borderRadius:2}}>
                        {actionLoading===req.id+"approved"?<span className="pulse">...</span>:"✓ APPROVE"}
                      </button>
                      <button className="btn-red" onClick={()=>handleDecision(req.id,"rejected")} style={{flex:1,padding:"10px",fontSize:10,borderRadius:2}}>
                        {actionLoading===req.id+"rejected"?<span className="pulse">...</span>:"✗ DECLINE"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tView==="clients"&&!selectedClient&&!editingClient&&!addingClient&&(
              <div>
                <div style={{display:"flex",gap:8,marginBottom:14}}>
                  <input
                    placeholder="Search clients..."
                    onChange={e=>setClientSearch(e.target.value.toLowerCase())}
                    style={{flex:1,background:"#0c0c0c",border:"1px solid #222",color:"#f0ead6",padding:"10px 13px",fontSize:12,fontFamily:"'Raleway',sans-serif",borderRadius:2}}/>
                  <button className="btn-gold" onClick={()=>{setNewClient({...EMPTY_CLIENT});setAddingClient(true);}} style={{padding:"10px 16px",fontSize:10,borderRadius:2,letterSpacing:2}}>+ ADD</button>
                </div>
                {(()=>{
                  const sorted = [...clients]
                    .filter(c=>!clientSearch||(c.name||"").toLowerCase().includes(clientSearch))
                    .sort((a,b)=>(a.name||"").localeCompare(b.name||""));
                  if(sorted.length===0) return <div style={{textAlign:"center",padding:"40px 0",color:"#555",fontFamily:"'Cinzel',serif",letterSpacing:2,fontSize:10}}>{clients.length===0?"NO CLIENTS YET":"NO RESULTS"}</div>;
                  let lastLetter = null;
                  return sorted.map(c=>{
                    const letter = (c.name||"?")[0].toUpperCase();
                    const showLetter = letter !== lastLetter;
                    lastLetter = letter;
                    return(
                      <div key={c.id}>
                        {showLetter&&<div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:"#7a6530",letterSpacing:3,marginTop:10,marginBottom:6,paddingBottom:4,borderBottom:"1px solid #1a1a1a"}}>{letter}</div>}
                        <div className="card" style={{cursor:"pointer",marginBottom:6}} onClick={()=>setSelectedClient(c)}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                              <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:"#c9a84c"}}>{c.name}</div>
                              <div style={{fontSize:11,color:"#555",marginTop:2}}>📞 {c.phone||"—"} · {c.totalSessions||0} total {c.clientCode&&<span style={{color:"#7a6530",marginLeft:4}}>· {c.clientCode}</span>}</div>
                              <div style={{display:"flex",gap:8,marginTop:4}}>
                                <span style={{fontSize:10,background:"#1a1a1a",border:"1px solid #222",padding:"2px 8px",borderRadius:10,color:"#c9a84c",fontFamily:"'Cinzel',serif",letterSpacing:1}}>W: {countSessions(c.trainingHistory,getWeekRange().mon,getWeekRange().sun)}</span>
                                <span style={{fontSize:10,background:"#1a1a1a",border:"1px solid #222",padding:"2px 8px",borderRadius:10,color:"#c9a84c",fontFamily:"'Cinzel',serif",letterSpacing:1}}>M: {countSessions(c.trainingHistory,getMonthRange().start,getMonthRange().end)}</span>
                              </div>
                            </div>
                            <div style={{fontSize:20,color:"#333"}}>›</div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>
            )}

            {tView==="clients"&&selectedClient&&!editingClient&&(
              <div className="fade">
                {(()=>{
                  const sorted=[...clients].sort((a,b)=>(a.name||"").localeCompare(b.name||""));
                  const idx=sorted.findIndex(c=>c.id===selectedClient.id);
                  const prev=idx>0?sorted[idx-1]:null;
                  const next=idx<sorted.length-1?sorted[idx+1]:null;
                  return(
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                      <button className="btn-ghost" onClick={()=>prev?setSelectedClient(prev):setSelectedClient(null)}
                        style={{padding:"6px 14px",fontSize:10,borderRadius:2}}>
                        {prev?`← ${prev.name.split(" ")[0]}`:"← LIST"}
                      </button>
                      <div style={{fontSize:9,color:"#555",letterSpacing:1,fontFamily:"'Cinzel',serif"}}>{idx+1} / {sorted.length}</div>
                      <div style={{display:"flex",gap:8,alignItems:"center"}}>
                        <button className="btn-gold" onClick={()=>setEditingClient({...selectedClient})} style={{padding:"8px 14px",fontSize:10,borderRadius:2,letterSpacing:1}}>✎ EDIT</button>
                        {next&&<button className="btn-ghost" onClick={()=>setSelectedClient(next)} style={{padding:"6px 14px",fontSize:10,borderRadius:2}}>{next.name.split(" ")[0]} →</button>}
                      </div>
                    </div>
                  );
                })()}
                <div style={{background:"#141414",border:"1px solid #222",borderLeft:"3px solid #c9a84c",padding:16,borderRadius:2,marginBottom:16}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:"#c9a84c",fontWeight:700}}>{selectedClient.name}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:4}}>{selectedClient.totalSessions||0} total sessions · Since {selectedClient.firstSession||"—"}</div>
                  <div style={{display:"flex",gap:10,marginTop:8}}>
                    <div style={{background:"#0c0c0c",border:"1px solid #222",padding:"8px 14px",borderRadius:2,textAlign:"center",flex:1}}>
                      <div style={{fontSize:9,color:"#555",letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:4}}>THIS WEEK</div>
                      <div style={{fontSize:22,color:"#c9a84c",fontFamily:"'Cinzel',serif",fontWeight:700}}>{countSessions(selectedClient.trainingHistory, getWeekRange().mon, getWeekRange().sun)}</div>
                    </div>
                    <div style={{background:"#0c0c0c",border:"1px solid #222",padding:"8px 14px",borderRadius:2,textAlign:"center",flex:1}}>
                      <div style={{fontSize:9,color:"#555",letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:4}}>THIS MONTH</div>
                      <div style={{fontSize:22,color:"#c9a84c",fontFamily:"'Cinzel',serif",fontWeight:700}}>{countSessions(selectedClient.trainingHistory, getMonthRange().start, getMonthRange().end)}</div>
                    </div>
                    <div style={{background:"#0c0c0c",border:"1px solid #222",padding:"8px 14px",borderRadius:2,textAlign:"center",flex:1}}>
                      <div style={{fontSize:9,color:"#555",letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:4}}>ALL TIME</div>
                      <div style={{fontSize:22,color:"#c9a84c",fontFamily:"'Cinzel',serif",fontWeight:700}}>{selectedClient.totalSessions||0}</div>
                    </div>
                  </div>
                </div>
                {[["CONTACT",[["Phone",selectedClient.phone],["Email",selectedClient.email],["Birthday",selectedClient.birthday],["Address",selectedClient.address],["Emergency",selectedClient.emergencyContact]]],
                  ["PHYSICAL",[["Age",selectedClient.age],["Weight",selectedClient.weight],["Height",selectedClient.height],["Body Fat",selectedClient.bodyFat]]],
                  ["HEALTH",[["Medical",selectedClient.medicalConditions],["Injuries",selectedClient.injuries],["Medications",selectedClient.medications],["Allergies",selectedClient.allergies]]],
                  ["TRAINING",[["Goal",selectedClient.fitnessGoal],["Experience",selectedClient.experienceLevel],["Program",selectedClient.trainingProgram],["Sessions/Week",selectedClient.sessionsPerWeek],["Preferred Time",selectedClient.preferredTime]]],
                  ["PERSONAL",[["Family & Life",selectedClient.familyInfo],["Notes",selectedClient.notes]]]
                ].map(([sec,fields])=>{
                  const visible=fields.filter(([,v])=>v);
                  if(!visible.length)return null;
                  return(
                    <div key={sec} style={{marginBottom:14}}>
                      <div className="sec-title">{sec}<div className="sec-line"/></div>
                      <div style={{display:"grid",gridTemplateColumns:sec==="PHYSICAL"?"repeat(2,1fr)":"1fr",gap:6}}>
                        {visible.map(([k,v])=>(
                          <div key={k} style={{background:"#0c0c0c",border:"1px solid #1a1a1a",padding:"10px 12px",borderRadius:2}}>
                            <div style={{fontSize:9,color:"#555",letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:3}}>{k.toUpperCase()}</div>
                            <div style={{fontSize:12,color:"#f0ead6"}}>{v}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
                <div className="sec-title">TRAINING HISTORY<div className="sec-line"/></div>
                <div style={{display:"flex",gap:8,marginBottom:12}}>
                  <input value={newEntry} onChange={e=>setNewEntry(e.target.value)} placeholder="Add session note..."
                    style={{flex:1,background:"#0c0c0c",border:"1px solid #222",color:"#f0ead6",padding:"10px 13px",fontSize:12,fontFamily:"'Raleway',sans-serif",borderRadius:2}}/>
                  <button className="btn-gold" onClick={addTrainingEntry} style={{padding:"10px 16px",fontSize:10,borderRadius:2}}>ADD</button>
                </div>
                {(selectedClient.trainingHistory||[]).length===0
                  ?<div style={{fontSize:11,color:"#555",textAlign:"center",padding:"16px 0"}}>No history yet</div>
                  :[...(selectedClient.trainingHistory||[])].reverse().map((e,i)=>(
                  <div key={i} style={{background:"#0c0c0c",border:"1px solid #1a1a1a",padding:"10px 12px",borderRadius:2,marginBottom:6}}>
                    <div style={{fontSize:9,color:"#7a6530",letterSpacing:1,marginBottom:3,fontFamily:"'Cinzel',serif"}}>{e.date}</div>
                    <div style={{fontSize:12}}>{e.notes}</div>
                  </div>
                ))}
              </div>
            )}


            {tView==="clients"&&addingClient&&(
              <div className="fade">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                  <button className="btn-ghost" onClick={()=>setAddingClient(false)} style={{padding:"6px 14px",fontSize:10,borderRadius:2}}>← CANCEL</button>
                  <button className="btn-gold" onClick={saveNewClient} disabled={!newClient.name.trim()&&!newClient.phone.trim()} style={{padding:"8px 16px",fontSize:10,borderRadius:2,opacity:(!newClient.name.trim()&&!newClient.phone.trim())?0.35:1}}>SAVE CLIENT</button>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div className="sec-title">CONTACT<div className="sec-line"/></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <FLD label="Full Name *" value={newClient.name} onChange={e=>setNewClient(p=>({...p,name:e.target.value}))} placeholder="Full name"/>
                    <FLD label="Client Code" value={newClient.clientCode||""} onChange={e=>setNewClient(p=>({...p,clientCode:e.target.value.toUpperCase()}))} placeholder="e.g. TG-482A"/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <FLD label="Phone" value={newClient.phone} onChange={e=>setNewClient(p=>({...p,phone:e.target.value}))} placeholder="+45..."/>
                    <FLD label="Email" value={newClient.email} onChange={e=>setNewClient(p=>({...p,email:e.target.value}))} placeholder="email"/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <FLD label="Birthday" value={newClient.birthday} onChange={e=>setNewClient(p=>({...p,birthday:e.target.value}))} placeholder="DD/MM/YYYY"/>
                    <FLD label="Emergency Contact" value={newClient.emergencyContact} onChange={e=>setNewClient(p=>({...p,emergencyContact:e.target.value}))} placeholder="Name & number"/>
                  </div>
                  <FLD label="Address" value={newClient.address} onChange={e=>setNewClient(p=>({...p,address:e.target.value}))} placeholder="Address"/>
                  <div className="sec-title">PHYSICAL<div className="sec-line"/></div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                    <FLD label="Age" value={newClient.age} onChange={e=>setNewClient(p=>({...p,age:e.target.value}))} placeholder="28"/>
                    <FLD label="Weight" value={newClient.weight} onChange={e=>setNewClient(p=>({...p,weight:e.target.value}))} placeholder="75kg"/>
                    <FLD label="Height" value={newClient.height} onChange={e=>setNewClient(p=>({...p,height:e.target.value}))} placeholder="178cm"/>
                    <FLD label="Body Fat" value={newClient.bodyFat} onChange={e=>setNewClient(p=>({...p,bodyFat:e.target.value}))} placeholder="15%"/>
                  </div>
                  <div className="sec-title">HEALTH<div className="sec-line"/></div>
                  <TXA label="Medical Conditions" value={newClient.medicalConditions} onChange={e=>setNewClient(p=>({...p,medicalConditions:e.target.value}))} placeholder="Conditions..."/>
                  <TXA label="Injuries" value={newClient.injuries} onChange={e=>setNewClient(p=>({...p,injuries:e.target.value}))} placeholder="Injuries..."/>
                  <TXA label="Medications" value={newClient.medications} onChange={e=>setNewClient(p=>({...p,medications:e.target.value}))} placeholder="Medications..."/>
                  <FLD label="Allergies" value={newClient.allergies} onChange={e=>setNewClient(p=>({...p,allergies:e.target.value}))} placeholder="Allergies..."/>
                  <div className="sec-title">TRAINING<div className="sec-line"/></div>
                  <TXA label="Fitness Goal" value={newClient.fitnessGoal} onChange={e=>setNewClient(p=>({...p,fitnessGoal:e.target.value}))} placeholder="Goals..."/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <FLD label="Experience" value={newClient.experienceLevel} onChange={e=>setNewClient(p=>({...p,experienceLevel:e.target.value}))} placeholder="Beginner/Int/Adv"/>
                    <FLD label="Sessions/Week" value={newClient.sessionsPerWeek} onChange={e=>setNewClient(p=>({...p,sessionsPerWeek:e.target.value}))} placeholder="e.g. 3"/>
                  </div>
                  <TXA label="Training Program" value={newClient.trainingProgram} onChange={e=>setNewClient(p=>({...p,trainingProgram:e.target.value}))} placeholder="Program details..." rows={3}/>
                  <FLD label="Preferred Time" value={newClient.preferredTime} onChange={e=>setNewClient(p=>({...p,preferredTime:e.target.value}))} placeholder="e.g. Morning"/>
                  <div className="sec-title">PERSONAL<div className="sec-line"/></div>
                  <TXA label="Family Info" value={newClient.familyInfo} onChange={e=>setNewClient(p=>({...p,familyInfo:e.target.value}))} placeholder="Family, kids, lifestyle..."/>
                  <TXA label="Notes" value={newClient.notes} onChange={e=>setNewClient(p=>({...p,notes:e.target.value}))} placeholder="Any other notes..."/>
                </div>
              </div>
            )}
            {tView==="clients"&&editingClient&&(
              <div className="fade">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
                  <button className="btn-ghost" onClick={()=>setEditingClient(null)} style={{padding:"6px 14px",fontSize:10,borderRadius:2}}>← CANCEL</button>
                  <button className="btn-gold" onClick={saveClientEdits} style={{padding:"8px 16px",fontSize:10,borderRadius:2}}>SAVE</button>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div className="sec-title">CONTACT<div className="sec-line"/></div>
                  <FLD label="Full Name" value={editingClient.name} onChange={e=>setEditingClient(p=>({...p,name:e.target.value}))} placeholder="Full name"/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <FLD label="Phone" value={editingClient.phone} onChange={e=>setEditingClient(p=>({...p,phone:e.target.value}))} placeholder="+45..."/>
                    <FLD label="Email" value={editingClient.email} onChange={e=>setEditingClient(p=>({...p,email:e.target.value}))} placeholder="email"/>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <FLD label="Birthday" value={editingClient.birthday} onChange={e=>setEditingClient(p=>({...p,birthday:e.target.value}))} placeholder="DD/MM/YYYY"/>
                    <FLD label="Emergency Contact" value={editingClient.emergencyContact} onChange={e=>setEditingClient(p=>({...p,emergencyContact:e.target.value}))} placeholder="Name & number"/>
                  </div>
                  <FLD label="Address" value={editingClient.address} onChange={e=>setEditingClient(p=>({...p,address:e.target.value}))} placeholder="Address"/>

                  <div className="sec-title">PHYSICAL<div className="sec-line"/></div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
                    <FLD label="Age" value={editingClient.age} onChange={e=>setEditingClient(p=>({...p,age:e.target.value}))} placeholder="28"/>
                    <FLD label="Weight" value={editingClient.weight} onChange={e=>setEditingClient(p=>({...p,weight:e.target.value}))} placeholder="75kg"/>
                    <FLD label="Height" value={editingClient.height} onChange={e=>setEditingClient(p=>({...p,height:e.target.value}))} placeholder="178cm"/>
                    <FLD label="Body Fat" value={editingClient.bodyFat} onChange={e=>setEditingClient(p=>({...p,bodyFat:e.target.value}))} placeholder="15%"/>
                  </div>

                  <div className="sec-title">HEALTH<div className="sec-line"/></div>
                  <TXA label="Medical Conditions" value={editingClient.medicalConditions} onChange={e=>setEditingClient(p=>({...p,medicalConditions:e.target.value}))} placeholder="Conditions..."/>
                  <TXA label="Injuries" value={editingClient.injuries} onChange={e=>setEditingClient(p=>({...p,injuries:e.target.value}))} placeholder="Injuries..."/>
                  <TXA label="Medications" value={editingClient.medications} onChange={e=>setEditingClient(p=>({...p,medications:e.target.value}))} placeholder="Medications..."/>
                  <FLD label="Allergies" value={editingClient.allergies} onChange={e=>setEditingClient(p=>({...p,allergies:e.target.value}))} placeholder="Allergies..."/>

                  <div className="sec-title">TRAINING<div className="sec-line"/></div>
                  <TXA label="Fitness Goal" value={editingClient.fitnessGoal} onChange={e=>setEditingClient(p=>({...p,fitnessGoal:e.target.value}))} placeholder="Goals..."/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                    <FLD label="Experience" value={editingClient.experienceLevel} onChange={e=>setEditingClient(p=>({...p,experienceLevel:e.target.value}))} placeholder="Beginner/Int/Adv"/>
                    <FLD label="Sessions/Week" value={editingClient.sessionsPerWeek} onChange={e=>setEditingClient(p=>({...p,sessionsPerWeek:e.target.value}))} placeholder="e.g. 3"/>
                  </div>
                  <TXA label="Training Program" value={editingClient.trainingProgram} onChange={e=>setEditingClient(p=>({...p,trainingProgram:e.target.value}))} placeholder="Program details..." rows={3}/>
                  <FLD label="Preferred Time" value={editingClient.preferredTime} onChange={e=>setEditingClient(p=>({...p,preferredTime:e.target.value}))} placeholder="e.g. Morning"/>

                  <div className="sec-title">PERSONAL<div className="sec-line"/></div>
                  <TXA label="Family Info" value={editingClient.familyInfo} onChange={e=>setEditingClient(p=>({...p,familyInfo:e.target.value}))} placeholder="Family, kids, lifestyle..."/>
                  <TXA label="Notes" value={editingClient.notes} onChange={e=>setEditingClient(p=>({...p,notes:e.target.value}))} placeholder="Any other notes..."/>
                </div>
              </div>
            )}

            {tView==="history"&&(
              <div>
                {requests.length===0
                  ?<div style={{textAlign:"center",padding:"50px 0",color:"#555",fontFamily:"'Cinzel',serif",letterSpacing:2,fontSize:10}}>NO HISTORY YET</div>
                  :[...requests].reverse().map(req=>(
                  <div key={req.id} className={`card ${req.status}`}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div>
                        <div style={{fontFamily:"'Cinzel',serif",fontSize:13,color:req.status==="approved"?"#2ecc71":req.status==="rejected"?"#c0392b":"#c9a84c"}}>{req.name}</div>
                        <div style={{fontSize:11,color:"#555",marginTop:2}}>{req.date} · {req.time}–{req.timeEnd}</div>
                        <div style={{fontSize:11,color:"#444",marginTop:1}}>📞 {req.phone}</div>
                      </div>
                      <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:6}}>
                        <div style={{fontSize:9,letterSpacing:2,fontFamily:"'Cinzel',serif",color:req.status==="approved"?"#2ecc71":req.status==="rejected"?"#c0392b":req.status==="cancelled"?"#888":"#c9a84c"}}>{req.status.toUpperCase()}</div>
                        {req.status==="approved"&&(
                          <button className="btn-red" onClick={()=>cancelRequest(req.id)}
                            style={{padding:"5px 10px",fontSize:9,borderRadius:2}}>
                            {actionLoading===req.id+"cancel"?<span className="pulse">...</span>:"CANCEL"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}


        {/* ASSISTANT TRAINER VIEW */}
        {appMode==="assistant"&&(
          <div className="fade">
            <div style={{fontFamily:"'Cinzel',serif",fontSize:10,color:"#555",letterSpacing:3,marginBottom:16}}>ASSISTANT — CLIENT OVERVIEW</div>
            <div className="divider"/>
            {clients.length===0
              ?<div style={{textAlign:"center",padding:"50px 0",color:"#555",fontFamily:"'Cinzel',serif",letterSpacing:2,fontSize:10}}>NO CLIENTS YET</div>
              :clients.map(c=>(
              <div key={c.id} className="card" style={{cursor:"pointer"}} onClick={()=>setSelectedClient(c)}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                  <div>
                    <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:"#c9a84c"}}>{c.name}</div>
                    <div style={{fontSize:11,color:"#555",marginTop:3}}>
                      {c.age?`Age: ${c.age}`:""}{c.age&&c.experienceLevel?" · ":""}{c.experienceLevel||""}
                    </div>
                  </div>
                  <div style={{fontSize:20,color:"#333"}}>›</div>
                </div>
              </div>
            ))}

            {selectedClient&&(
              <div className="fade" style={{marginTop:8}}>
                <div style={{marginBottom:16}}>
                  <button className="btn-ghost" onClick={()=>setSelectedClient(null)} style={{padding:"6px 14px",fontSize:10,borderRadius:2}}>← BACK</button>
                </div>
                <div style={{background:"#141414",border:"1px solid #222",borderLeft:"3px solid #c9a84c",padding:16,borderRadius:2,marginBottom:16}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:"#c9a84c",fontWeight:700}}>{selectedClient.name}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:4}}>{selectedClient.totalSessions||0} sessions</div>
                </div>

                <div className="sec-title">PHYSICAL<div className="sec-line"/></div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6,marginBottom:14}}>
                  {[["Age",selectedClient.age],["Weight",selectedClient.weight],["Height",selectedClient.height],["Body Fat",selectedClient.bodyFat]].filter(([,v])=>v).map(([k,v])=>(
                    <div key={k} style={{background:"#0c0c0c",border:"1px solid #1a1a1a",padding:"10px 12px",borderRadius:2}}>
                      <div style={{fontSize:9,color:"#555",letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:3}}>{k.toUpperCase()}</div>
                      <div style={{fontSize:12,color:"#f0ead6"}}>{v}</div>
                    </div>
                  ))}
                </div>

                <div className="sec-title">HEALTH<div className="sec-line"/></div>
                <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
                  {[["Medical Conditions",selectedClient.medicalConditions],["Injuries",selectedClient.injuries],["Medications",selectedClient.medications],["Allergies",selectedClient.allergies]].filter(([,v])=>v).map(([k,v])=>(
                    <div key={k} style={{background:"#0c0c0c",border:"1px solid #1a1a1a",borderLeft:"2px solid #c0392b",padding:"10px 12px",borderRadius:2}}>
                      <div style={{fontSize:9,color:"#555",letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:3}}>{k.toUpperCase()}</div>
                      <div style={{fontSize:12,color:"#f0ead6"}}>{v}</div>
                    </div>
                  ))}
                  {!selectedClient.medicalConditions&&!selectedClient.injuries&&!selectedClient.medications&&!selectedClient.allergies&&(
                    <div style={{fontSize:11,color:"#555",textAlign:"center",padding:"10px 0"}}>No health notes</div>
                  )}
                </div>

                <div className="sec-title">TRAINING<div className="sec-line"/></div>
                <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:14}}>
                  {[["Goal",selectedClient.fitnessGoal],["Experience",selectedClient.experienceLevel],["Program",selectedClient.trainingProgram],["Sessions/Week",selectedClient.sessionsPerWeek],["Preferred Time",selectedClient.preferredTime]].filter(([,v])=>v).map(([k,v])=>(
                    <div key={k} style={{background:"#0c0c0c",border:"1px solid #1a1a1a",padding:"10px 12px",borderRadius:2}}>
                      <div style={{fontSize:9,color:"#555",letterSpacing:2,fontFamily:"'Cinzel',serif",marginBottom:3}}>{k.toUpperCase()}</div>
                      <div style={{fontSize:12,color:"#f0ead6"}}>{v}</div>
                    </div>
                  ))}
                </div>

                <div className="sec-title">TRAINING HISTORY<div className="sec-line"/></div>
                {(selectedClient.trainingHistory||[]).length===0
                  ?<div style={{fontSize:11,color:"#555",textAlign:"center",padding:"16px 0"}}>No history yet</div>
                  :[...(selectedClient.trainingHistory||[])].reverse().map((e,i)=>(
                  <div key={i} style={{background:"#0c0c0c",border:"1px solid #1a1a1a",padding:"10px 12px",borderRadius:2,marginBottom:6}}>
                    <div style={{fontSize:9,color:"#7a6530",letterSpacing:1,marginBottom:3,fontFamily:"'Cinzel',serif"}}>{e.date}</div>
                    <div style={{fontSize:12}}>{e.notes}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {/* CLIENT VIEW */}
        {appMode==="client"&&(
          <div>


            {portalView==="login"&&(
              <div className="fade">
                <button className="btn-ghost" onClick={()=>{setPortalView(null);setPortalCode("");setPortalError(false);}}
                  style={{padding:"6px 14px",fontSize:10,borderRadius:2,marginBottom:24}}>← BACK</button>
                <div style={{textAlign:"center",paddingTop:20}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:14,color:"#c9a84c",letterSpacing:3,marginBottom:8}}>CLIENT PORTAL</div>
                  <div style={{fontSize:11,color:"#555",letterSpacing:2,marginBottom:32}}>ENTER YOUR CLIENT CODE</div>
                  <div style={{maxWidth:280,margin:"0 auto"}}>
                    <input value={portalCode} onChange={e=>setPortalCode(e.target.value.toUpperCase())}
                      onKeyDown={e=>e.key==="Enter"&&handlePortalLogin()}
                      placeholder="e.g. TG-482A"
                      style={{width:"100%",background:"#0c0c0c",border:`1px solid ${portalError?"#c0392b":"#222"}`,color:"#f0ead6",padding:"14px",fontSize:16,fontFamily:"'Cinzel',serif",borderRadius:2,textAlign:"center",letterSpacing:4,marginBottom:12,transition:"border-color 0.2s"}}/>
                    {portalError&&<div style={{color:"#c0392b",fontSize:10,letterSpacing:2,marginBottom:12}}>INVALID CODE — TRY AGAIN</div>}
                    <button className="btn-gold" onClick={handlePortalLogin}
                      disabled={!portalCode.trim()}
                      style={{width:"100%",padding:"14px",fontSize:11,borderRadius:2}}>
                      LOGIN →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {portalView==="portal"&&portalClient&&(
              <div className="fade">
                <button className="btn-ghost" onClick={()=>{setPortalView(null);setPortalClient(null);}}
                  style={{padding:"6px 14px",fontSize:10,borderRadius:2,marginBottom:20}}>← BACK</button>
                <div style={{background:"#141414",border:"1px solid #222",borderLeft:"3px solid #c9a84c",padding:16,borderRadius:2,marginBottom:20}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:"#c9a84c",fontWeight:700}}>
                    Welcome, {portalClient.name.split(" ")[0]}
                  </div>
                  <div style={{fontSize:10,color:"#555",marginTop:4,letterSpacing:2}}>CLIENT CODE: {portalClient.clientCode}</div>
                </div>

                {(()=>{
                  const myReqs = requests.filter(r=>r.phone===portalClient.phone&&r.status==="approved");
                  const now = new Date(); now.setHours(0,0,0,0);
                  const upcoming = myReqs.filter(r=>new Date(r.dateISO)>=now).sort((a,b)=>new Date(a.dateISO)-new Date(b.dateISO));
                  const past = myReqs.filter(r=>new Date(r.dateISO)<now).sort((a,b)=>new Date(b.dateISO)-new Date(a.dateISO));
                  return(
                    <div>
                      <div className="sec-title">UPCOMING SESSIONS<div className="sec-line"/></div>
                      {upcoming.length===0
                        ?<div style={{fontSize:11,color:"#555",textAlign:"center",padding:"16px 0",marginBottom:16}}>No upcoming sessions</div>
                        :upcoming.map(r=>(
                        <div key={r.id} style={{background:"#141414",border:"1px solid #222",borderLeft:"3px solid #2ecc71",padding:"12px 14px",borderRadius:2,marginBottom:8}}>
                          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                            <div>
                              <div style={{fontFamily:"'Cinzel',serif",fontSize:12,color:"#f0ead6"}}>{r.date}</div>
                              <div style={{fontSize:12,color:"#2ecc71",marginTop:2}}>{r.time} – {r.timeEnd}</div>
                            </div>
                            <button className="btn-red" onClick={()=>{
                              if(window.confirm(`Cancel your session on ${r.date} at ${r.time}?`)){
                                handleClientCancel(r.id);
                              }
                            }} style={{padding:"8px 14px",fontSize:10,borderRadius:2}}>CANCEL</button>
                          </div>
                        </div>
                      ))}

                      <button className="btn-gold" onClick={()=>{setPortalView(null);setCView("calendar");}}
                        style={{width:"100%",padding:"14px",fontSize:11,borderRadius:2,marginBottom:20,marginTop:4}}>
                        + BOOK NEW SESSION
                      </button>

                      {past.length>0&&(
                        <>
                          <div className="sec-title">PAST SESSIONS<div className="sec-line"/></div>
                          {past.slice(0,5).map(r=>(
                            <div key={r.id} style={{background:"#0c0c0c",border:"1px solid #1a1a1a",padding:"10px 14px",borderRadius:2,marginBottom:6}}>
                              <div style={{fontFamily:"'Cinzel',serif",fontSize:11,color:"#555"}}>{r.date} · {r.time}–{r.timeEnd}</div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}
            {cView==="cancelled"&&(
              <div className="fade" style={{textAlign:"center",paddingTop:60}}>
                <div style={{fontSize:48,marginBottom:16}}>✓</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:16,color:"#c9a84c",letterSpacing:3,marginBottom:12}}>SESSION CANCELLED</div>
                <div style={{color:"#555",lineHeight:1.9,fontSize:13,marginBottom:40}}>
                  Your session has been cancelled.<br/>Other clients have been notified of the open slot.
                </div>
                <button className="btn-ghost" onClick={()=>{setCView("calendar");setSelectedDate(null);}} style={{padding:"14px 32px",fontSize:10,borderRadius:2}}>BACK TO CALENDAR</button>
              </div>
            )}
            {cView==="submitted"&&(
              <div className="fade" style={{textAlign:"center",paddingTop:60}}>
                <div style={{fontSize:48,marginBottom:16}}>⚡</div>
                <div style={{fontFamily:"'Cinzel',serif",fontSize:16,color:"#c9a84c",letterSpacing:3,marginBottom:12}}>REQUEST SENT</div>
                <div style={{color:"#555",lineHeight:1.9,fontSize:13,marginBottom:40}}>Your booking request has been submitted.<br/>You will be contacted to confirm your session.</div>
                <button className="btn-ghost" onClick={()=>{setCView("calendar");setSelectedDate(null);}} style={{padding:"14px 32px",fontSize:10,borderRadius:2}}>BOOK ANOTHER</button>
              </div>
            )}

            {cView==="calendar"&&(
              <div className="fade">
                <div style={{marginBottom:18}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:10,color:"#555",letterSpacing:3,marginBottom:8}}>BOOK A SESSION</div>
                  <div className="divider"/>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:"#333",letterSpacing:1,fontFamily:"'Cinzel',serif"}}>
                    <span>MON–FRI  06:00–21:00</span><span>SAT–SUN  07:00–14:00</span>
                  </div>
                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                  <button className="btn-ghost" onClick={()=>setCurrentMonth(new Date(currentMonth.getFullYear(),currentMonth.getMonth()-1,1))} style={{padding:"6px 14px",fontSize:14,borderRadius:2}}>←</button>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:15,letterSpacing:3,color:"#c9a84c"}}>{MONTHS[currentMonth.getMonth()].toUpperCase()} {currentMonth.getFullYear()}</div>
                  <button className="btn-ghost" onClick={()=>setCurrentMonth(new Date(currentMonth.getFullYear(),currentMonth.getMonth()+1,1))} style={{padding:"6px 14px",fontSize:14,borderRadius:2}}>→</button>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3,marginBottom:6}}>
                  {DAYS.map(d=><div key={d} style={{textAlign:"center",fontSize:9,color:"#333",letterSpacing:1,padding:"4px 0",fontFamily:"'Cinzel',serif"}}>{d}</div>)}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:3}}>
                  {buildCalendarDays().map((date,i)=>{
                    if(!date)return <div key={i}/>;
                    const past=date<today,sel=selectedDate&&date.toDateString()===selectedDate.toDateString(),isToday=date.toDateString()===today.toDateString(),wknd=isWeekend(date);
                    return <button key={i} onClick={()=>{if(!past){setSelectedDate(date);setSelectedSlot(null);setCView("slots");}}} className={`cal-cell${past?" past":""}${sel?" selected":""}${isToday?" today":""}${!sel&&wknd&&!past?" weekend":""}`}>{date.getDate()}</button>;
                  })}
                </div>


              <div style={{marginTop:24,paddingTop:16,borderTop:"1px solid #1a1a1a",textAlign:"center"}}>
                <button className="btn-ghost" onClick={()=>setPortalView("login")}
                  style={{padding:"12px 28px",fontSize:10,borderRadius:2,letterSpacing:2,width:"100%"}}>
                  MANAGE MY BOOKING
                </button>
              </div>
              </div>
            )}

            {cView==="slots"&&selectedDate&&(
              <div className="fade">
                <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
                  <button className="btn-ghost" onClick={()=>setCView("calendar")} style={{padding:"6px 12px",fontSize:10,borderRadius:2,minWidth:64}}>← BACK</button>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <button className="btn-ghost" onClick={()=>{const d=new Date(selectedDate);d.setDate(d.getDate()-1);if(d>=today){setSelectedDate(d);setSelectedSlot(null);}}} style={{padding:"6px 12px",fontSize:14,borderRadius:2}}>←</button>
                    <div style={{textAlign:"center",minWidth:110}}>
                      <div style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:2,color:"#c9a84c"}}>{DAYS_FULL[selectedDate.getDay()].toUpperCase()}</div>
                      <div style={{fontSize:11,color:"#555"}}>{selectedDate.getDate()} {MONTHS[selectedDate.getMonth()].toUpperCase()}</div>
                    </div>
                    <button className="btn-ghost" onClick={()=>{const d=new Date(selectedDate);d.setDate(d.getDate()+1);setSelectedDate(d);setSelectedSlot(null);}} style={{padding:"6px 12px",fontSize:14,borderRadius:2}}>→</button>
                  </div>
                  <div style={{minWidth:64}}/>
                </div>
                <div className="divider"/>
                {slots.map(slot=>{
                  const isApproved=requests.some(r=>r.slotKey===slot.key&&r.status==="approved");
                  const isPending=requests.some(r=>r.slotKey===slot.key&&r.status==="pending");
                  const unavailable=slot.booked||isApproved;
                  return(
                    <button key={slot.key} className="slot" disabled={unavailable} onClick={()=>{setSelectedSlot(slot);setCView("form");}} style={{borderColor:unavailable?"#111":isPending?"#7a6530":"#222"}}>
                      <span style={{fontFamily:"'Cinzel',serif",fontSize:12,letterSpacing:1}}>{formatTime(slot.time)} – {formatTime(slot.endTime)}</span>
                      <span style={{fontSize:9,letterSpacing:2,color:unavailable?"#252525":isPending?"#7a6530":"#444"}}>{unavailable?"BOOKED":isPending?"PENDING":"AVAILABLE"}</span>
                    </button>
                  );
                })}
              </div>
            )}

            {cView==="form"&&selectedSlot&&(
              <div className="fade">
                <button className="btn-ghost" onClick={()=>setCView("slots")} style={{padding:"6px 14px",fontSize:10,borderRadius:2,marginBottom:20}}>← BACK</button>
                <div style={{background:"#141414",border:"1px solid #222",borderLeft:"3px solid #c9a84c",padding:16,marginBottom:24,borderRadius:2}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:9,letterSpacing:3,color:"#555",marginBottom:6}}>SESSION REQUEST</div>
                  <div style={{fontFamily:"'Cinzel',serif",fontSize:18,color:"#c9a84c"}}>{formatTime(selectedSlot.time)} – {formatTime(selectedSlot.endTime)}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:4}}>{formatDate(selectedDate)}</div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:14}}>
                  <FLD label="FULL NAME *" value={clientForm.name} onChange={setF("name")} placeholder="Your full name"/>
                  <FLD label="PHONE NUMBER *" value={clientForm.phone} onChange={setF("phone")} placeholder="+45 12 34 56 78"/>
                  <div style={{fontSize:10,color:"#333",letterSpacing:1,display:"flex",gap:6,alignItems:"center"}}>
                    <span style={{color:"#7a6530"}}>🔒</span> Your trainer will contact you to confirm
                  </div>
                  <button className="btn-gold" onClick={submitRequest} disabled={submitting||!clientForm.name.trim()||!clientForm.phone.trim()} style={{padding:"16px",fontSize:12,borderRadius:2,marginTop:4}}>
                    {submitting?<span className="pulse">SUBMITTING...</span>:"REQUEST SESSION →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
