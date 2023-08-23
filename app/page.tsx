"use client";

import EventCard from "../components/EventCard";

export default function Home() {
  return (
    <>
      <div className="row mt-4">
        <h1 className="text-4xl tracking-tight font-extrabold text-white-900 sm:text-5xl md:text-6xl">
          <span>Discover what&apos;s</span>
          <span className="text-indigo-600"> happening</span>
          <span> around you</span>
        </h1>
        <p className="mt-3 text-base text-gray sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Find, join, and create events with your frens!
        </p>
      </div>
      <br />
      <div>
        <EventCard />
      </div>
    </>
  );
}
