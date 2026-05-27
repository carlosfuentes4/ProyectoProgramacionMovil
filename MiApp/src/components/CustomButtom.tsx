import { Text, TouchableOpacity, StyleSheet } from "react-native"; 

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "tertiary";
};

export default function CustomButton({title,onPress,variant="primary"}:ButtonProps){
const styles=getStyles(variant);

return(
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
);
}

const getStyles = (variant: "primary" | "secondary" | "tertiary") =>
    StyleSheet.create({
    button:{
        borderRadius: 6,
        //operador ternario
        backgroundColor: variant === "primary" ? "#87D68D" : 
                            variant === "secondary" ? "#93B48B" : 
                            "#8491A3",
        padding:12,
        width: 150,
    },
    buttonText:{
        color:  variant === "primary" ? 'white' :
                variant === "secondary" ? 'white' :
                'gray',
        textAlign: 'center',
    }
})