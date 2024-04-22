import React, { useState } from 'react';
import { FeedbackHeader } from '../../components/FeedbackHeader/FeedbackHeader'
import { FeedbackOptions } from '../../components/FeedbackOptions/FeedbackOptions'
import { FeedbackNotifications } from '../../components/FeedbackNotifications/FeedbackNotifications'
import { Statistics } from '../../components/Statistics/Statistics'

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  const handleLeaveFeedback = event => {
    const { name } = event.target;
    setFeedback(prevFeedback => ({ ...prevFeedback, [name]: prevFeedback[name] + 1 }));
  };

  const total = countTotalFeedback();
  const positiveFeedback = countPositiveFeedbackPercentage();

  return (
    <>
      <FeedbackHeader title="Please leave feedback">
        <FeedbackOptions options={feedback} onLeaveFeedback={handleLeaveFeedback} />
        {total === 0 ? (
          <FeedbackNotifications message="There is no feedback" />
        ) : (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={positiveFeedback}
          />
        )}
      </FeedbackHeader>
    </>
  );
};
