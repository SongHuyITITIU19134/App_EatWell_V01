import { Image } from "expo-image";

export const CachedImage = (props) => {
  const { uri } = props;

  return <Image source={uri} {...props} />;
};
