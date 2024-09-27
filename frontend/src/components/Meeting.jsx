import React, { useState } from 'react';
import { DatePicker, TimePicker, Button, notification } from 'antd';
import { MailOutlined, CalendarOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const { RangePicker } = DatePicker;

const sendTeamsInvite = (meetingDetails) => {
  // Logic to send Teams invite
  console.log('Teams invite sent with details:', meetingDetails);
};

const sendEmailNotification = (meetingDetails) => {
  // Logic to send email notification
  console.log('Email notification sent with details:', meetingDetails);
};

const Meeting = () => {
  const [dateRange, setDateRange] = useState([]);
  const [time, setTime] = useState(null);

  const handleSchedule = () => {
    if (dateRange.length && time) {
      const [startDate, endDate] = dateRange;
      const meetingDetails = {
        startDate: startDate.format('YYYY-MM-DD'),
        endDate: endDate.format('YYYY-MM-DD'),
        time: time.format('HH:mm'),
      };

      sendTeamsInvite(meetingDetails);
      sendEmailNotification(meetingDetails);

      notification.success({
        message: 'Meeting Scheduled',
        description: 'The meeting has been scheduled and an email notification has been sent.',
      });
    } else {
      notification.error({
        message: 'Incomplete Information',
        description: 'Please select both date range and time.',
      });
    }
  };

  return (
    <div className="m-10">
      <div className="mb-4">
        <RangePicker
          className="w-full"
          onChange={(dates) => setDateRange(dates)}
        />
      </div>
      <div className="mb-4">
        <TimePicker
          className="w-full"
          onChange={(time) => setTime(time)}
          format="HH:mm"
        />
      </div>
      <Button
        type="primary"
        icon={<CalendarOutlined />}
        className="w-full mb-2"
        onClick={handleSchedule}
      >
        Schedule Meeting
      </Button>
      <Button
        type="default"
        icon={<MailOutlined />}
        className="w-full"
        onClick={handleSchedule}
      >
        Send Email Notification
      </Button>
    </div>
  );
};

export default Meeting;
