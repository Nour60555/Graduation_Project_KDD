import React from "react";
import "./NewsEvents.css";

// Sample data for news
const newsArticles = [
  {
    id: 1,
    title: "New CKD Treatment Approved",
    date: "2025-08-01",
    description:
      "A breakthrough in CKD treatment has been approved by the FDA, offering hope to millions.",
    link: "https://www.kidney.org/press-room/fda-approves-new-drug-to-treat-diabetes-related-kidney-disease",
    bgImage:
      "https://www.shutterstock.com/image-vector/medical-health-care-human-kidney-260nw-2391753911.jpg",
  },
  {
    id: 2,
    title: "Awareness Campaign Launched",
    date: "2025-07-15",
    description:
      "A nationwide campaign has been launched to spread awareness about kidney health.",
    link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9412733/",
    bgImage: "https://thumbs.dreamstime.com/z/kidney-icon-different-style-vector-illustration-two-colored-black-kidney-vector-icons-designed-filled-outline-line-161202519.jpg?ct=jpeg.jpg",
  },
  {
    id: 3,
    title: "Research Internship Program in Harvard",
    date: "Deadline: 2025-11-30",
    description:
      "This internship is open to all healthcare professionals, researchers, and multidisciplinary teams affiliated with any health system or academic medical center.",
    link: "https://hsrpkm.bwh.harvard.edu/",
    bgImage: "https://t3.ftcdn.net/jpg/03/13/80/24/240_F_313802484_ebLWCcdVmElW6er1pPSeVTwb9XLqMoCq.jpg",
  },
];

// Sample data for events
const upcomingEvents = [
  {
    id: 1,
    title: "CKD Awareness Walkathon",
    datetimeISO: "2025-09-10T09:00:00",
    location: "Cairo, Egypt",
    bgImage: "https://drneilsaldanha.com/assets/images/services/s1.jpg",
  },
  {
    id: 2,
    title: "Kidney Health Webinar",
    datetimeISO: "2025-09-20T18:00:00",
    location: "Online",
    bgImage: "https://eventnook.s3.amazonaws.com/u/72996/image_2008187205317_tk-2020-eventnook-banner.jpg",
  },
];

export default function NewsEvents() {
  return (
    <div className="NewsEvents-container">
      <h1>News & Events</h1>

      {/* News Section */}
      <section className="news-section">
        <h2>Latest News</h2>
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className="news-card"
            style={{
              backgroundImage: `url(${article.bgImage})`,
            }}
          >
            <h3>{article.title}</h3>
            <small>{article.date}</small>
            <p>{article.description}</p>
            <a href={article.link}>Read more</a>
          </div>
        ))}
      </section>

      {/* Events Section */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="event-card"
            style={{
              backgroundImage: `url(${event.bgImage})`,
            }}
          >
            <h3>{event.title}</h3>
            <small>{new Date(event.datetimeISO).toLocaleString()}</small>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Send your CV at:</strong>{" "}
              <a href="mailto:support@kidneyhealth.org">
                support@kidneyhealth.org
              </a>
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
