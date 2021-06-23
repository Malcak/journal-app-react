import React from 'react';

export const JournalEntry = () => {
  return (
    <div className="journal__entry pointer">
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: 'cover',
          backgroundImage:
            'url(https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg)',
        }}
      ></div>
      <div className="journal__entry-body">
        <p className="journal__entry-title">Un nuevo día</p>
        <p className="journal__entry-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};
