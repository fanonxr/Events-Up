import React, { Component, createRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

class CropperInput extends Component {
    // create own ref
    cropper = createRef();

    // method to crop the image
    cropImage = () => {
        const { setImage } = this.props;

        if (typeof this.cropper.current.getCroppedCanvas() === 'undefined') {
            return;
        } // current allows to get element from the DOM

        this.cropper.current.getCroppedCanvas().toBlob(blob => {
            setImage(blob);
        }, 'image/jpeg')
    }

    render() {
        const { imagePreview } = this.props;
        return (
            <Cropper
                // we need to get access to the actual DOM that the USER is using
                ref={this.cropper}
                src={imagePreview}
                style={{ height: 200, width: '100%' }}
                preview='.img-preview' // provides as a class attribute
                aspectRatio={1}
                viewMode={1}
                dragMode='move'
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
            />
        );
    }
}

export default CropperInput;