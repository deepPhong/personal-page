import React, { useState } from 'react';

import addToMailchimp from 'gatsby-plugin-mailchimp';

const EmailListForm: React.FunctionComponent<{}> = () => {

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('For irregular updates and reflexions');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addToMailchimp(email)
      .then((data) => {
        if (data.result === 'success') {
          setIsSubscribed(true);
          setMessage('Thanks for subscribing! You should receive an email shortly.');
        } else {
          setMessage('Either you are already subscribed or your email is invalid.');
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
          {message}
        </p>
      </div>
    );
  } else {
    return(
      <div>
        <div className='text-sm'>
          {message}
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col text-base'>
          <div className='flex flex-row rounded-md border-current-text border shadow w-64 hover:border-orange hover:text-orange'>
            <input
              className='appearance-none border-none bg-transparent rounded-md h-full w-full text-sm placeholder-current-text focus:outline-none focus:ring-0'
              placeholder="Type your email..."
              name="email"
              type="text"
              onChange={handleEmailChange}
            />
            <button 
              className='bg-transparent px-2 all-small-caps text-base'
              type="submit"
            >
              subscribe
            </button>
          </div>
        </form>
      </div>
    )
  }
};

export default EmailListForm;