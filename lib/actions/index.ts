"use server"

import { revalidatePath } from "next/cache";
import Scholarship from "../models/scholarship.model";
import { connectToDB } from "../mongoose";
import { scrapeScholarshipWebsiteACT, scrapeScholarshipWebsiteAppily, scrapeScholarshipWebsiteCareerOneStop, scrapeScholarshipWebsiteCollegeBoard, scrapeScholarshipWebsiteJLVCounseling } from "../scraper";
import mongoose from "mongoose";



export async function scrapeAndStoreScholarship() {
    try {
      //connect to MongoDB database
      connectToDB();

      console.log("Scraping and storing scholarships...");
      const scrapedScholarship1 = await scrapeScholarshipWebsiteACT("https://www.act.org/content/act/en/students-and-parents/college-planning-resources/paying-for-college/free-college-scholarships/free-college-scholarships-info.html?submissionGuid=9f7183aa-9c5d-4a24-93ba-8c88a12fd164"); {

      if(!scrapedScholarship1) return;

      let scholarships = scrapedScholarship1;
      
      for (let i = 0; i < scholarships.length; i++) {
          const currentScholarship = scholarships[i];

          if (currentScholarship.url && typeof currentScholarship.url === 'string') {
            const existingScholarship = await Scholarship.findOne({url: currentScholarship.url });
            if (existingScholarship) {
              console.log(`Scholarship at index ${i} already exists:`, existingScholarship)
            } else {
                const newScholarship = await Scholarship.findOneAndUpdate(
                  { url: currentScholarship.url },
                  scholarships[i],
                  { upsert: true, new: true}
                );
              console.log(`Scholarship at index ${i} inserted:`, currentScholarship)
              revalidatePath(`/scholarships/${newScholarship._id}`);
            }
          } else {
              console.log(`Skipping scholarship at index ${i} due to missing or invalid URL.`)
          }
        }    
      //console.log("Scholarship data:" , scrapedScholarship1);
      }
/*
      console.log("Scraping and storing scholarships...");
      const scrapedScholarship2 = await scrapeScholarshipWebsiteJLVCounseling("https://jlvcollegecounseling.com/scholarships/all-scholarships-2/"); {
         // store this in the db soon 
      console.log("Scholarship data:" , scrapedScholarship2);
      }
/*
      console.log("Scraping and storing scholarships...");
      const scrapedScholarship3 = await scrapeScholarshipWebsiteAppily("https://www.appily.com/guidance/equity-and-access#tab_522046_3"); {
         // store this in the db soon 
      console.log("Scholarship data:" , scrapedScholarship3);
      }

      console.log("Scraping and storing scholarships...");
      const scrapedScholarship4 = await scrapeScholarshipWebsiteCareerOneStop("https://www.careeronestop.org/Toolkit/Training/find-scholarships.aspx?curPage=1&sortcolumns=Deadline&sortdirections=DESC&studyLevelfilter=High%20School&awardTypefilter=Scholarship"); {
         // store this in the db soon 
      console.log("Scholarship data:" , scrapedScholarship4);
      }

      console.log("Scraping and storing scholarships...");
      const scrapedScholarship5 = await scrapeScholarshipWebsiteCollegeBoard("https://bigfuture.collegeboard.org/scholarship-search"); {
         // store this in the db soon 
      console.log("Scholarship data:" , scrapedScholarship5);
      }
      */
    } catch (error: any) {
      throw new Error(`Failed to create/update scholarship: ${error.message}`)
      
    }
}

export async function getScholarships() {
  try {
    connectToDB();

    const scholarships = Scholarship.find({});
    const plainScholarships = (await scholarships).map(Scholarship => Scholarship.toObject());
    //console.log(plainScholarships)
    
    return plainScholarships

  } catch (error) {
      console.log(error);
      return [];
  }
}