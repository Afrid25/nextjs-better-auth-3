import React, { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form';

const ResetPasswordPage = () => {
    return (
        <div>
            <h2 className='text-3xl text-white flex justify-center'>Reset Your Password</h2>
            <Suspense fallback={<div className='text-white'>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;