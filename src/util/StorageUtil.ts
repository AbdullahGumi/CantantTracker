import * as SecureStore from "expo-secure-store";

export const storeItemToStorage = async (
  key: string,
  value: string,
  options?: SecureStore.SecureStoreOptions
) => {
  return await SecureStore.setItemAsync(key, value, options)
    .then(() => {
      return true;
    })
    .catch((e) => {
      console.error("Error storing item: " + e);
      return false;
    });
};

export const getItemFromStorage = async (
  key: string,
  options?: SecureStore.SecureStoreOptions
) => {
  try {
    const item = await SecureStore.getItemAsync(key, options);
    return item;
  } catch (e) {
    console.debug("Error getting item: ", e as Error);
  }
};
export const removeItemFromStorage = async (
  key: string,
  options?: SecureStore.SecureStoreOptions
) => {
  try {
    const result = await SecureStore.deleteItemAsync(key, options);
    return result;
  } catch (error) {
    console.debug("Error removing item: ", error as Error);
  }
};
