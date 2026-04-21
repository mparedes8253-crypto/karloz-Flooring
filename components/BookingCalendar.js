import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const BookingCalendar = ({ availability }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        const generatedDates = [];
        for (let d = today; d <= nextWeek; d.setDate(d.getDate() + 1)) {
            generatedDates.push(new Date(d));
        }
        setDates(generatedDates);
    }, []);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const isAvailable = (date, time) => {
        return availability[date] && availability[date].includes(time);
    };

    return (
        <div className="booking-calendar">
            <h2>Select Appointment Date and Time</h2>
            <div className="date-picker">
                {dates.map(date => (
                    <button key={date} onClick={() => handleDateChange(date)}>
                        {date.toDateString()}
                    </button>
                ))}
            </div>
            {selectedDate && (
                <div className="time-picker">
                    <h3>Available Times for {selectedDate.toDateString()}:</h3>
                    {availability[selectedDate.toISOString().split('T')[0]] ? (
                        availability[selectedDate.toISOString().split('T')[0]].map(time => (
                            <button key={time} onClick={() => handleTimeChange(time)} disabled={!isAvailable(selectedDate.toISOString().split('T')[0], time)}>
                                {time}
                            </button>
                        ))
                    ) : (
                        <p>No available times.</p>
                    )}
                </div>
            )}
            {selectedTime && <p>Selected Time: {selectedTime}</p>}
        </div>
    );
};

BookingCalendar.propTypes = {
    availability: PropTypes.object.isRequired,
};

export default BookingCalendar;