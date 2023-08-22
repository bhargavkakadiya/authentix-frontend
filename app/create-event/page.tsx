"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DateTimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Button } from "@mui/material";
const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";

export default function CreateEvent() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          Create your next Event here!
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off">
              <TextField
                id="standard-basic"
                label="Event Name"
                variant="standard"
              />
            </Box>{" "}
          </div>
          <br />
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off">
              <DateTimePicker
                label="Event Time"
                defaultValue={dayjs("2023-08-20T15:30")}
              />{" "}
            </Box>{" "}
          </div>
          <br />
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off">
              <TextField
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                id="standard-basic"
                label="Max Attendees"
                variant="standard"
                defaultValue={99}
              />
            </Box>{" "}
          </div>
          <br />
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "70ch" },
              }}
              noValidate
              autoComplete="off">
              <TextField
                id="standard-basic"
                label="Event URL"
                variant="standard"
              />
            </Box>{" "}
          </div>
          <br />
          <div>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "70ch" },
              }}
              noValidate
              autoComplete="off">
              <TextField
                id="standard-basic"
                label="Event Description"
                variant="standard"
              />
            </Box>{" "}
          </div>
          <br />
          <div>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Cancel
              </Button>
              <Button variant="contained" endIcon={<SendIcon />}>
                Create
              </Button>
            </Stack>{" "}
          </div>
        </LocalizationProvider>
      </ThemeProvider>
    </>
  );
}
