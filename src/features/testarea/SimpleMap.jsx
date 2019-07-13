import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {
    static defaultProps = {
        zoom: 11
    };

    render() {
        const { latlng } = this.props;
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyCKdb0kpwc7Wv550n63coAoq7v29EI76s8&libraries=places' }}
                    defaultCenter={latlng}
                    defaultZoom={this.props.zoom}
                >
                    {/* <AnyReactComponent
                        lat={latlng.lat}
                        lng={latlng.lng}
                    /> */}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;