
import xlsx, { IJsonSheet } from "json-as-xlsx"

async function getData() {
    // fetch data from your db's api
    const res = await fetch("https://api.mockaroo.com/api/040055b0?count=1000&key=7b52ed80")
    const data = await res.json()
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