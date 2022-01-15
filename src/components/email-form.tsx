import React, { useState } from 'react';

import addToMailchimp from 'gatsby-plugin-mailchimp';

const EmailListForm: React.FunctionComponent<{}> = () => {

  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addToMailchimp(email)
      .then((data) => {
        if (data.result === 'success') {
          setIsSubscribed(true);
        }
      })
      .catch((error: Error) => {
        // Errors in here are client side
        // Mailchimp always returns a 200
      });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.currentTarget.value);
  };

  if (isSubscribed) {
    return (
      <div>
        <p>
          Thanks for subscribing!
        </p>
      </div>
    );
  } else {
    return(
      <form onSubmit={handleSubmit} className='flex flex-col text-base'>
        For irregular updates and reflexions
        <div className='flex flex-row rounded-md border-current-text border shadow hover:border-orange hover:text-orange'>
          <input
            className='appearance-none border-none bg-transparent rounded-md h-full w-full text-sm placeholder-current-text focus:outline-none focus:ring-0'
            placeholder="Type your email..."
            name="email"
            type="text"
            onChange={handleEmailChange}
          />
          <button 
            className='bg-transparent px-2'
            type="submit"
          >
            subscribe
          </button>
        </div>
      </form>
    )
  }
};

export default EmailListForm;