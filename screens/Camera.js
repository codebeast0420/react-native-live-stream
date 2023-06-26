import React from "react";
import {
	View,
	StyleSheet,
	Text
} from 'react-native';
import { RNCamera } from "react-native-camera";
import { useCamera } from "react-native-camera-hooks";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Camera() {

	const [{ cameraRef }, { takePicture }] = useCamera(null);

	const captureHandle = async () => {
		try {
			const data = await takePicture();
			console.log(data.uri);
		} catch (error) {
			console.log(error)
		}
	}
	return (
		<View style={style.body}>
			<RNCamera
				ref={cameraRef}
				type={RNCamera.Constants.Type.back}
				style={style.preview}
			>
				<TouchableOpacity onPress={() => captureHandle()}>
					<Text>Capture</Text>
				</TouchableOpacity>
			</RNCamera>
		</View>
	)
}

const style = StyleSheet.create({
	body: {
		flex: 1,
	},
	preview: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end'
	}
})