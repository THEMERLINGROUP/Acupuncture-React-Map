import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL, {Marker, Popup} from 'react-map-gl';
import * as Acupuncture from './data/acupuncture.json';
import 'mapbox-gl/dist/mapbox-gl.css';
import './index.css';

import AlternativeMedicine from './Acupuncture'


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 41.5951,
        longitude: -72.6454,
        zoom: 14,
        bearing: 0,
        pitch: 0
      },
      popupInfo: null
    };
  }


_renderCityMarker = (acupuncture, index) => {
  return(
    <Marker 
        key={`marker-${index}`} 
        latitude={acupuncture.coordinates[1]} 
        longitude={acupuncture.coordinates[0]}
      >
        <button 
          className="marker-btn"
          onClick={() => this.setState({popupInfo: acupuncture})}
        >
          <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxASEBAQEA8PEBAQEA8PEA8PDw8PDxAPFRUWFhUSFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFRAQFy0dFR0tKy0tLSstLS0tNy0tLS0rKysrKystKy8rKystLSstKy0rLSsrKy0rLSstMC0tLS0rK//AABEIALcBEwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQIDBAUGBwj/xAA6EAACAgECBAIGCAUEAwAAAAAAAQIDEQQhBRIxQVFhBhMicYGRBxQyUqGxwdEjM0Ji8CSS4fFDcqL/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EACIRAQEAAgICAgIDAAAAAAAAAAABAhEhMQMSQWEyURMUIv/aAAwDAQACEQMRAD8A8YAAJWAAUAEKhEPSECxJYkcUSxEqHIURDkBgUk09alOEZTVcZSjGVksuME3hyfkupf8ASLg09JqJ0TfNhKULEmo2QaypINXWxub18sofETAAZ7Y3IgBoba3BZL1ix32x54Z02gpUq1Hf2d5P+5t7GN6F8P57ZWtZjWsL/wB5L9sna06WME/N5e3yMfJ26fF+LD1uj9nGN+qa6oxlq8SddicVLCUseznxfh5nS62XvbZkaqpNPKz16kzI7j+nOcQ0nJnHRt4Tf+fAyLsP/PwOk1FCUeTrHwfb3P8AEwbKuvyNccmWePDPa8Qg8Mlmu3yZEayuawTEYPoEWMjGKwYRQEWBPF+zKXf7KIcdl/2PsaSUfDr5yDZ6Qgx8RrAtGipCpCjBooCiCbAg4QlYAAGUKhyGDkI0kSREcCRCVDkPihhJAVOFwdpwixcR0j0Nj/1emi56Ox9bK0t6m/L8vccaS6XVTqnGyuTjOElKMl2kh45av0WeHtOO4israbjJNSTaafVNbNMjOo9LrNPqIVa6mUIW2+xqdMusbo9bEvB7b+45cdmqWN9psCwi20kstvCXiwOj9CuF+su9bJexVuvBz7fIm3UXjN113A+G+oohX/VhSk/7n1Lt+y8ydIqamRz2uuTTK1TM7USNHU7mZqe4hWXq5GNqomprGZN5eLLJQsjuROJYsRCzaVhTHEby4JRCtpsRNAiRoRIey0RbEciSQxhCoQYFQDLRAFEAUAAASYAAlUAAAzKhyGoehA+I8jQ9MkzkSxI4kiCqh3MMyDBAZ0JYfins14oSccP37p+KFHR39n/a/B+HuAhRVKcowisyk1FLzPWOC8NVFMK11S9p+M31Zz3oRwFx/wBTasS/8cX2X3vedlymOeTo8ePG0FjwZ+qmXrnsZupl1M2qheyPT8Ndtd9rlGEKYZcpZalJ9Irzx+gzUWMu+kVn1fS06RbWT/j6jHXL+zH8v9pr48Zd29Rh5crNSd1xupkZd5pamRl3MMRkrWMhkSzIWaxjSAAjKSXI1sBGxkRsQUQElAQABRAAAAABkmAAEoAACMqHoYh8QoSIllTKKi5RlFSWYuUWlJeMc9V7iKJ1fCvStOmGk19K1WmglCuWyvoj25X3x89gxkvYytnUczEejpOIeivNB6jQWLV0d4x/n1eU4dWc5j3ryezQssbO1YZTKcEaOi4DGGp089FJRjdFyu01mEnN/wBVTffplHPE2k5+eLq5vWJpwcPtKS6NEXpt4svXLaOcGm01hptNPqmdL6J+jjtkrbYtVp5jFr7b8X5HQV+j8b5x1dtfJNwi7aVjld3eXx2Ol0dCjHpv4Y6Gdz401/iky38CFaSS8FhILJD5MgtfXczWqamfwMzVP59y5qJGfqJAGdqJ756NfPYzeJ6ydk5Tsm5zeMye7eC5q57tJeD8jH1EvAqM7Odqt0yhcWbWVbDTFnVeRFIkmRM0jKkGjmNZaKTIgCMCoAQBpKAAIwKA6KAE5QHgAKwFAR6IKIKBhEiQlcG9km2a2i4HdPtheZNyk7Vjjb0zkOR1Gm9FvvNs0KfRWD7Gf8sazxZOU4bxG6iasoslXNd4vZrwa6NGtxnif11VtaSMNQm/W3VJ4tXRez2Om03olUuVyh1zjPR48Dc0nCoQ+zBL3IL5uNK/r87vbguGeid1jzN8kf8A6O54N6P00L2Ye1957yZqQoXu8y1CGOvzX6mNztazGRHGGO3bAYLKh4DlQSpnW7FC6XUv6qH4GZa/H5DNXknLZJtywkkstv3FDV1uPMpJpp4afVM3uC1Zvg+0cz+S/wCjI4pY5WTk/wCqTfwL9dYezL3tz9fjTB1ODH1KNvUx6/gUPqvM/akoQylKyS2XuX9T8kKHWK65SajGMpSbwoxi5Sb8EluyTi/CLNOo+tlWrJbulSUrK1258dH5GzbxiGni4aGDhJrE9XYk9RNeEe1cfJHMaiTbbbbb6tvLfvNIWUxxl+aqzImSzImaxy01jWOY1lppBGDGsabSghBUBFBAPggMsYiiiAKAEACPAUQlYLXDtBO6ahBe99kRaXTysnGEVmUnhHr3ox6OwoqW3tNJt+Zn5M/WfbXxeP2vPTG4N6MQqSbXNLuzfq0GOxrx0xPVQsrPTKz447nJbbeXbxjOGbVovItV6ZeBpz0qW6eY9n3+IirKuFx7Rj5Jl0rQrWOWW8Xvjun4rwYKHLhS3z9mXaXk/B+RchVkkdCkmn0YaaTOa1elGCyy7XVsL9USfMunTl64LUIjkZ2o6qRba8ImRHb0HpG2Nrodf8RjWx/I3tXDJl6iHcS4o03yhlw2ck4t4zs+xn6lGhZB5WPPP6fqVL4t5Dd6OSdsbUx6mVqYmzqIv9DPvrCFWLfAzr4G1fAzr4GmNZZRlzRCy5bArSRrGFiJjWOY1mkZ01jSSMMoa4MaTRUGByiwAiiURIAMCCiAAAABJAAs8O0juthVHrOSXw7kVpP07n6NeBZb1E4+UD0yNZBwXhyqqhWlsoo0/VnJld3buxnrNKiqHxrLCgKoC0e0cU10H8meiw/Acoj4xNMcrOLzGOWMvM4psIEmMCqvuuvj+46Pux+otGbFEkYjlEekMILCvYy3OG5UvQjU7ijdXk0rKfZ5s92irKHUVmuzxyl6Zk6ynbVl4WW3sl5mtbX1/MzrujSfXZ+OPDyJrTHVvLF1VWJSWzSx7S7y7pGbqIGzqI7GTqUEPOy3iajLvgZl9ZsXIo21lSsrGRbWVLKzWtrKdkDWVjlGbOJDJF6ysrTgayscoILYVgBREBgAJIIKwGCMQViAKAAAI87z6KeFesvlc1lVrlXvODPc/ov4b6rRwlj2rMzfxMfJ038U5266FexIqyaER/IZ+ro2q8g1osTiZ2rvthLar1kMbuLXOvgxdHjLldRbjEWK3KlHFKZezzckvuWJwl+PUuKQDLG49w9C4+IkWPQ0Erj/AMEjGoJMAZNlSRbl0K9gjV5NcuO+X8ipNFi14l8Hj5kU3keWW9fRY4+u/tUvWxnaiJp2ooXIzaxk3wyZepq3NvULuUbopiUxLqynbWa99ZQurGmsqysqW1GrZWVrIDlRYybKyrZSa1tZWnA0mTK4suUcDWXrKirZUa45MriiYAxGWgjABBpAAIAAAABZ01XPOEPvSUfmfSnAdMq6K4JdIpfgeAehum9ZraI9ubm+R9GaWOEvcYZ3l1eLpaigYiBsloZMiXUfKS79PIgjYs4fXzHMbeU3KS6pL9PCe04Rl70mQ6fh0YPMJ2Rjv/DcuaHwT6FpIeTqNPe61vhFXFrzRMmNyKmNCZEXcXmGpgCzImiWT3Gx7iCvKBT1E4xcYt7zbjHbv1NKSMviNeZ0PD2sefL2WLLpp45LdXpHbEo3x2NOyJRvJsEZF6M+009REzrYiUo3FOxF+1FS1CDPtRXlAvWoq2RGiqVsCvZAvWRIJocqbFKdZBOoutDZRLlTYyrKSvOtmvKsgnUaY5oyw2y2IXbKCvKk0mTC4WIhB0o4GlJGBBQAO3+izT82t5vuQf4nulJ439EFX8W6Xgoo9hqkc+Xbswn+YtJiTEiR2MSjJMY0mtxsmI5Cls6FkvZycl03Xg/0JIyz+q8CJSJFuVct/HKJhq8Xgr6gpEfO+/z/AHQRnklabnGqQyUgiATocJETsPRb+DJEM4Z7477fkTSIwCrdVsZ+or3NiSKeogKxUrD1ETNvRr6mBl6lEVcrNvKU2X7UUbokmrWFWws2FaURkhsK9iLFiIZAmoJIYyeRG0PZIGhkkTtDZIcpaVZQIp1lqSIpIuVNxVHURToRdkhjiXMmdxUfq/mBb5AH7J9XefRAv57/ALl+SPWKWeSfRJP+evNfkeq0yM8u66MPxi6pDZjUyG2zsSaHUR5ljLXmmVLI3R6SVi8HtL5lmU9xHIWl452cfCnHXuLxOMo791t8zSo1CktiOO+2BVHw29w4WVl6mliLGTaWWlu9mN5iKcwTpK5kkXtgqRZNUwg0uQDm/AYhHHdv98F740j1m9/IlIGNaDAlBsr3lhxI5xAmPrEY+qfU3dbHYw9WiauMy4oWmheijbEhSpYQSLM0VrEAV7SGSJ5kEgTUchjHSZHIARjGOkyKTHCNkMkObIpMqFTZDGxWMZSKMijQGTrvoqt/i3R8os9aomACz7aeP8IsKZWvt3EAlUV/WA7QAStJoyJI2AAyFk/3Ks5gACQ+uWxapkACgq0uwN7gBaBIRvAAMEjYOn0EAEsvXLGTB1DACa0jOvKVyACFKdiK1wAIKljIZsABNRSZFKQAMjJMZJgAwikxjYAVCqNjWADQQQAGT//Z" alt="x" height="30px" width="30px" />
        </button>
      </Marker>
  )    
}

_updateViewport = viewport => {
    this.setState({viewport});
  };

_onClickMarker = med => {
  this.setState({popupInfo: med})
}

_renderPopup() {
  const {popupInfo} = this.state;

    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.coordinates[0]}
          latitude={popupInfo.coordinates[1]}
          closeOnClick={false}
          onClose={() => this.setState({popupInfo: null})}
        >
          <Acupuncture info={popupInfo} />
        </Popup>
      )
    );
}

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/paduac/cka3d505900wa1ipi02v9on7h"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
      
      {Acupuncture.acupuncture.map(this._renderCityMarker)}
      {this._renderPopup()}

      </MapGL>
    );
  }
}

document.body.style.margin = 0;
render(<Root />, document.body.appendChild(document.createElement('div')));

export default Root;