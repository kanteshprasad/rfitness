'use client';

import React, { useState, useEffect } from 'react';
import { Client, Databases, Storage, Account, ID } from 'appwrite';
import imageCompression from 'browser-image-compression';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
const collectionId = process.env.NEXT_PUBLIC_COLLECTION_ID;
const bucketId = process.env.NEXT_PUBLIC_BUCKET_ID;
const databaseId = process.env.NEXT_PUBLIC_DATABASE_ID;

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(projectId);

const databases = new Databases(client);
const storage = new Storage(client);
const account = new Account(client);

const CreateMember = () => {
    const [formData, setFormData] = useState({
        name: '',
        months: '',
        doj: '',
        payment: '',
        dob: '',
        goal: '',
        email: '',
        phone: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await account.get();
                setUser(userData);
            } catch (err) {
                setError('Failed to fetch user.');
            }
        };

        fetchUser();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 0.25,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true
                };
                const compressedFile = await imageCompression(file, options);
                const compressedBlob = new Blob([compressedFile], { type: file.type });
                const uniqueFilename = `${uuidv4()}_${file.name}`;
                const compressedFileObject = new File([compressedBlob], uniqueFilename, { type: file.type });
                setImageFile(compressedFileObject);
            } catch (err) {
                setError('Failed to compress image.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const dojDate = new Date(formData.doj);
            const doeDate = new Date(dojDate);
            doeDate.setDate(doeDate.getDate() + parseInt(formData.months) * 30);
            const formattedDOE = doeDate.toISOString().split('T')[0];

            let pictureURL = '';
            if (imageFile) {
                const fileUploaded = await storage.createFile(bucketId, ID.unique(), imageFile);
                pictureURL = `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${fileUploaded.$id}/view?project=66b0747b001cea147dd4&mode=admin`;
            }

            await databases.createDocument(
                databaseId,
                collectionId,
                ID.unique(),
                {
                    ...formData,
                    months: parseInt(formData.months),
                    doj: formData.doj,
                    doe: formattedDOE,
                    picture: pictureURL,
                }
            );

            setSuccess('Member created successfully!');
            setFormData({
                name: '',
                months: '',
                doj: '',
                payment: '',
                dob: '',
                goal: '',
                email: '',
                phone: '',
            });
            setImageFile(null);
        } catch (err) {
            setError(`Failed to create member. ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-member-form">
            <h2>Add New Member</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                    <Form.Label>Name <span className="required-badge">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="months">
                    <Form.Label>Months <span className="required-badge">*</span></Form.Label>
                    <Form.Control
                        type="number"
                        name="months"
                        value={formData.months}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="doj">
                    <Form.Label>Date of Joining <span className="required-badge">*</span></Form.Label>
                    <Form.Control
                        type="date"
                        name="doj"
                        value={formData.doj}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="payment">
                    <Form.Label>Payment <span className="required-badge">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="payment"
                        value={formData.payment}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="dob">
                    <Form.Label>Date of Birth <span className="required-badge">*</span></Form.Label>
                    <Form.Control
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="goal">
                    <Form.Label>Goal <span className="required-badge">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email <span className="required-badge">*</span></Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="phone">
                    <Form.Label>Phone <span className="required-badge">*</span></Form.Label>
                    <Form.Control
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="picture">
                    <Form.Label>Profile Picture</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? <Spinner animation="border" size="sm" /> : 'Add Member'}
                </Button>
            </Form>
        </div>
    );
};

export default CreateMember;
