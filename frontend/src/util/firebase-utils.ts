import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";

export async function getProfileURL(stringRef: string) {
	try {
		const profileRef = ref(storage, stringRef);
		return await getDownloadURL(profileRef);
	} catch (error) {
    return null
  }
}