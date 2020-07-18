import React from 'react';


// Referring to Lecture 285 make this changes
// I pass two props to update the Rank:

// const Rank = ({name, entries}) => { 

// and display them in the <div>:

// {`${name} , your current rank is...`}
//       <div className='white f1 '>
//         {entries}
//       </div>

      
const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3'>
        {`${name}, your current entry count is...`}
      </div>
      <div className='white f1'>
        {entries}
      </div>
    </div>
  );
}

export default Rank;