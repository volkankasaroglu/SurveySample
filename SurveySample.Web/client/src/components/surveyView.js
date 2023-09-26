import React, { useState } from 'react';
import Poll from 'react-polls';

const pollQuestion = 'Is react-polls useful?';
const initialPollAnswers = [
  { option: 'Yes', votes: 8 },
  { option: 'No', votes: 2 }
];
const pollStyle = {
  questionSeparator: true,
  questionSeparatorWidth: '5px',
  questionBold: false ,
  questionColor: '#303030',
  align: 'left',
  theme: 'black'
}

export function SurveyView() {
  const [pollAnswers, setPollAnswers] = useState(initialPollAnswers);

  const handleVote = voteAnswer => {
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++;
      return answer;
    });
    setPollAnswers(newPollAnswers);
  };

  return (
    <div className="col-6 mx-auto">
      <Poll question={pollQuestion} answers={pollAnswers} onVote={handleVote} customStyles={pollStyle} noStorage />
    </div>
  );
}
