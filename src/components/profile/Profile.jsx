import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { CircularProgress, Box } from '@mui/material';
import { db } from '../../firebaseconfig'; // Import the Firestore database configuration
import UserProfileForm from './UserProfileForm';
import ProfileDisplay from './ProfileDisplay';
import Cookies from 'js-cookie';

const Profile = ({setter}) => {
    const userId = Cookies.get('user_id');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const docRef = doc(db, 'profiles', userId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setProfile(docSnap.data());
            }
            setLoading(false);
        };

        fetchProfile();
    }, [userId]);

    const saveProfile = async (profileData) => {
        const profileRef = doc(db, 'profiles', userId);
        try {
            await setDoc(profileRef, profileData);
            setProfile(profileData);
            setter(true);
            navigate('/learn'); // Navigate after successful save
        } catch (error) {
            console.error('Error saving profile:', error);
            // Handle the error appropriately
        }
    };

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    return profile ? (
        <ProfileDisplay profile={profile} onSave={saveProfile} />
    ) : (
        <UserProfileForm onSave={saveProfile} />
    );
};

export default Profile;
