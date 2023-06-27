import React from "react";
import {
	View,
	StyleSheet,
	Text
} from 'react-native';
import { RNCamera } from "react-native-camera";
import { useCamera } from "react-native-camera-hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import { moveFile } from "react-native-fs";
import  RNFS  from 'react-native-fs'

export default function Camera() {

	const [{ cameraRef }, { takePicture, recordVideo }] = useCamera(null);

	const captureHandle = async () => {
		try {
			const data = await recordVideo();
			console.log(data.uri);
			const filePath = data.uri;
			const newFilePath = RNFS.ExternalDirectoryPath + '/MyTest.mp4';
			moveFile(filePath, newFilePath);
			console.log(newFilePath);
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
				<TouchableOpacity onPress={() => captureHandle()} className='w-full' >
					<Text className='p-[15px] bg-[#4da6ff] w-full text-center'>Record</Text>
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