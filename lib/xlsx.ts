
import xlsx, { IJsonSheet } from "json-as-xlsx"
import { getScholarships } from "./actions";

async function getData() {
    // fetch data from your db's api
    let data = await getScholarships();
    return data
  }
  
export default async function downloadToCSV() {
    const data = await getData()

    let columns:IJsonSheet[] = [
        {
            sheet: "Scholarships",
            columns: [
                {label: "Status", value: "status"},
                {label: "Amount", value: "amount"},
                {label: "Deadline", value: "deadline"},
                {label: "Scholarship Name", value: "name"},
                {label: "Requirements", value: "requirements"},
                {label: "Link", value: "link"},
            ],
            content: data
        },
    ];

    let settings = {
        fileName: "Scholarship Spreadsheet",
    };

    xlsx(columns, settings);
} 