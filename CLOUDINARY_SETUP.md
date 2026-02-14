# Setting Up Cloudinary for Image Uploads

## Option 1: Use Cloudinary (Recommended)

1. **Sign up for Cloudinary** (free tier available)
   - Go to https://cloudinary.com/users/register/free
   - Create an account

2. **Get your Cloud Name**
   - After login, go to Dashboard
   - Copy your "Cloud Name" (e.g., `dxxxx1234`)

3. **Create an Upload Preset**
   - Go to Settings → Upload
   - Scroll to "Upload presets"
   - Click "Add upload preset"
   - Set:
     - Preset name: `aideesigns_bookings`
     - Signing mode: **Unsigned**
     - Folder: `bookings` (optional)
   - Click "Save"

4. **Update your `.env` file**
   ```bash
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   VITE_CLOUDINARY_UPLOAD_PRESET=aideesigns_bookings
   ```

5. **Restart dev server**
   ```bash
   npm run dev
   ```

## Option 2: Use URL Input Only

If you don't want to set up Cloudinary:
- Users can paste image URLs from Imgur, Google Drive, etc.
- The file upload button will still show but may not work without Cloudinary configured
- This is fine for testing or if you want users to use external image hosting

## Testing

1. Go to `/booking`
2. Try both upload methods:
   - **Upload File**: Select an image from your computer
   - **Image URL**: Paste an image URL from any website
3. Image should preview below the upload area
