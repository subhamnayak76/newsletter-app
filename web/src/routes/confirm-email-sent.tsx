import { useLocation } from 'react-router-dom';

export const ConfirmEmailSent = () => {
  const location = useLocation();
  const email = location.state?.email;

  return (
    <div>
      <h1>Email Confirmation Sent</h1>
      <p>A confirmation email has been sent to {email}. Please check your inbox.</p>
    </div>
  );
};








