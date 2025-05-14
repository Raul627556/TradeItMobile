import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    formRow: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
    },
    formColumn: {
        flex: 1,
    },
    outerContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    formContainer: {
        width: Platform.OS === 'web' ? '50%' : '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        marginLeft: 5,
        fontWeight: '600',
        fontSize: 14,
        marginTop: 10,
        color: '#444',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        backgroundColor: '#f9f9f9',
        marginBottom: 8,
    },
    inputError: {
        borderColor: 'red',
    },
    loginButton: {
        backgroundColor: '#FF4B00',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    createAccount: {
        color: '#FF4B00',
        fontWeight: '600',
        marginTop: 20,
        fontSize: 15,
        textAlign: 'center',
    },
    imagePicker: {
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    imagePickerText: {
        color: '#333',
        fontWeight: '600',
    },
    previewImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginTop: 5,
        marginBottom: 15,
        resizeMode: 'cover',
    },
});
