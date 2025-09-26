"use client";
import { getSheetData } from "./google-sheets.actions";
import { getFileMetadata } from "@/lib/googledriveService";
import { Button } from "@/components/ui/button";
// import { get } from "http";
export default function Page() {

  const handleOnGetSheetDataClick = async () => {
    const response = await getFileMetadata();
    console.log(response)
  };

  return <Button onClick={handleOnGetSheetDataClick}>Get Sheet Data</Button>;
}
// spreadsheet-test@eirene-5413a.iam.gserviceaccount.com