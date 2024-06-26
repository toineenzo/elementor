import PropTypes from 'prop-types';
import App from '../editor/app';
import { IMAGE_PROMPT_CATEGORIES, LOCATIONS } from '../editor/pages/form-media/constants';

export const AIMediaGenerateApp = ( { onClose } ) => {
	return (
		<>
			<App
				type={ 'media' }
				getControlValue={ () => {} }
				setControlValue={ () => {} }
				onClose={ onClose }
				isRTL={ elementorCommon.config.isRTL }
				additionalOptions={ {
					defaultImageType: Object.keys( IMAGE_PROMPT_CATEGORIES )[ 1 ],
				} }
			/>
		</>
	);
};

AIMediaGenerateApp.propTypes = {
	onClose: PropTypes.func.isRequired,
};

export const AIMediaEditApp = ( { onClose, imageId } ) => {
	const image = wp.media.attachment( imageId );

	return (
		<>
			<App
				type={ 'media' }
				getControlValue={ () => image.attributes }
				setControlValue={ () => {} }
				onClose={ onClose }
				isRTL={ elementorCommon.config.isRTL }
				additionalOptions={ {
					location: LOCATIONS.IMAGE_TOOLS,
				} }
			/>
		</>
	);
};

AIMediaEditApp.propTypes = {
	onClose: PropTypes.func.isRequired,
	imageId: PropTypes.string,
};
