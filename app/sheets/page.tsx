"use client";
import { getSheetData } from "./google-sheets.actions";
import { Button } from "@/components/ui/button";
export default function Page() {

  const handleOnGetSheetDataClick = async () => {
    const response = await getSheetData();
    console.log(response)
  };

  return <Button onClick={handleOnGetSheetDataClick}>Get Sheet Data</Button>;
}
// spreadsheet-test@eirene-5413a.iam.gserviceaccount.com