import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
    outerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    formContainer: {
        width: Platform.OS === 'web' ? '50%' : '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 40,
        alignSelf: 'center',
    },
    label: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
    input: {
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#FF4B00',
        padding: 15,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    loginText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    createAccount: {
        color: '#FF4B00',
        fontWeight: '600',
        marginTop: 15,
        fontSize: 16,
        textAlign: 'center',
    },
    terms: {
        color: '#555',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20,
    },
});
