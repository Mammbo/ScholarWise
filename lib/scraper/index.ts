import axios from 'axios'
import * as cheerio from 'cheerio'
const puppeteer = require('puppeteer')
import { Browser } from 'puppeteer'



// functions for the scrapers 

// ACT Deadline scraper 
function getDeadline(deadline: any) {
    const dateMatch = deadline.match(/(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}/);

    if (dateMatch) {

        let currentYear = new Date().getFullYear();
        let cleanedDate = dateMatch[0].trim();

        let date = new Date(cleanedDate.concat(" ", currentYear ));
        // extract the indvidual components that make up the date
        let month = date.getMonth() + 1; 
        let day = date.getDate();
        let year = date.getFullYear();

        return `${month}/${day}/${year}`
    
    } else {
        return ""
    }

}

// JLV scraping function Created 4 more of these and export the async functions

export async function scrapeScholarshipWebsiteJLVCounseling(url: string) {
    //BrightData Proxy Configuration 
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
     // fetching the actual page
     const response = await axios.get(url, options); 

     console.log(response.data);
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}

// Appily WebScraping function
export async function scrapeScholarshipWebsiteAppily(url: string) {
    //BrightData Proxy Configuration 
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
     // fetching the actual page
     const response = await axios.get(url, options); 

     console.log(response.data);
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}

// CollegeBoard Websites
export async function scrapeScholarshipWebsiteCollegeBoard(url: string) {
    //BrightData Proxy Configuration 
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
     // fetching the actual page
     const response = await axios.get(url, options); 

     console.log(response.data);
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}

// CareerOneStop
export async function scrapeScholarshipWebsiteCareerOneStop(url: string) {
    //BrightData Proxy Configuration 
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
     // fetching the actual page
     const response = await axios.get(url, options); 

     console.log(response.data);
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}

// ACT
export async function scrapeScholarshipWebsiteACT(url: string) {
    //BrightData Proxy Configuration 
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
     // fetching the actual page
        const response = await axios.get(url, options); 
    // initialize cheerio 
        const $ = cheerio.load(response.data);
    // extract other information
        const scholarships: Array<Record<string, string>> = [];

    // Select all table rows within the panel-body
        $('div.panel-body table tbody tr').each((index, element) => { 
            const titleElement = $(element).find('td').eq(0).find('a');
            const title = titleElement.text().trim();
            const deadline = $(element).find('td').eq(2).text().trim();
            const amount = ($(element).find('td').eq(4).text().trim()).replace(/\D/g, '');
            const url = titleElement.attr('href') || '';
            const requirement1 = $(element).find('td').eq(2).text().trim();
            const requirement2 = $(element).find('td').eq(3).text().trim();
            const requirement3 = $(element).find('td').eq(5).text().trim();

            // combine all requirements 
            const requirements = [requirement1, requirement2, requirement3].join(' | ')

            // get proper date 

            const formattedDeadline = getDeadline(deadline)

            console.log({url, title, formattedDeadline, amount, requirements})

            // push into one var and then return 

            if (title && url) {
                scholarships.push({
                    title,
                    deadline,
                    amount,
                    url,
                    requirements,
                     
                });
            // clean data and if there is not the data i want replace it with 'N/A or Varies' or if i put where it only accepts the numbers if there is nothing in a place put varies/ doesnt exist 
            }
        });

        return scholarships
        
    } catch (error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`)
    }
}