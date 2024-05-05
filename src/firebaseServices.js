import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, setDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyCFYwJhKYIDJEbJo2b1F6WMZuBs2BVmvNo",
    authDomain: "blog-b4a6c.firebaseapp.com",
    projectId: "blog-b4a6c",
    storageBucket: "blog-b4a6c.appspot.com",
    messagingSenderId: "709961648511",
    appId: "1:709961648511:web:e0da97392c8705c6cb324a",
    measurementId: "G-VXQYJ7712D"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

export function useSavePost() {

}

export function useGetAllSavedBlogs() {
    const [data, setData] = useState({ data: [], error: false, loading: true })

    const q = query(collection(db, "savedBlogs"), orderBy("timestamp", "desc"))

    useEffect(() => {
        getDocs(q).then((querySnap) => {
            const querySnapshots = []
            querySnap.forEach((snap) => {
                querySnapshots.push({ id: snap.id, ...snap.data() })
            })
            setData({ data: querySnapshots, error: false, loading: false })
        }).catch(() => {
            setData({ data: [], error: true, loading: false })
        });
    }, [])

    return data
}

export function useGetAllPublishedBlogs() {
    const [data, setData] = useState({ data: [], error: false, loading: true })

    const q = query(collection(db, "publishedBlogs"), orderBy("timestamp", "desc"))

    useEffect(() => {
        getDocs(q).then((querySnap) => {
            const querySnapshots = []
            querySnap.forEach((snap) => {
                console.log(snap)
                querySnapshots.push({ id: snap.id, ...snap.data() })
            })
            setData({ data: querySnapshots, error: false, loading: false })
        }).catch(() => {
            setData({ data: [], error: true, loading: false })
        });
    }, [])

    return data
}

export function useGetTopThreePublishedBlogs() {
    const [data, setData] = useState({ data: [], error: false, loading: true })

    const q = query(collection(db, "publishedBlogs"), orderBy("timestamp", "desc"), limit(3))

    useEffect(() => {
        getDocs(q).then((querySnap) => {
            const querySnapshots = []
            querySnap.forEach((snap) => {
                console.log(snap)
                querySnapshots.push({ id: snap.id, ...snap.data() })
            })
            setData({ data: querySnapshots, error: false, loading: false })
        }).catch(() => {
            setData({ data: [], error: true, loading: false })
        });
    }, [])

    return data
}

export function useGetSavedBlogById(id) {
    const [data, setData] = useState({ data: [], error: false, loading: true })

    useEffect(() => {
        if (id) {
            getDoc(doc(db, "savedBlogs", id)).then((snap) => {
                setData({ data: snap.data(), error: false, loading: false })
            }).catch(() => {
                setData({ data: [], error: true, loading: false })
            });
        } else {
            setData({ data: null, error: false, loading: false })
        }
    }, [])

    return data
}

export function useGetPublishedBlogById(id) {
    const [data, setData] = useState({ data: [], error: false, loading: true })

    useEffect(() => {
        if (id) {
            getDoc(doc(db, "publishedBlogs", id)).then((snap) => {
                setData({ data: snap.data(), error: false, loading: false })
            }).catch(() => {
                setData({ data: [], error: true, loading: false })
            });
        } else {
            setData({ data: null, error: false, loading: false })
        }
    }, [])

    return data
}

export function saveBlog(id, postData) {
    if (id) {
        return setDoc(doc(db, "savedBlogs", id), postData)
    } else {
        return addDoc(collection(db, "savedBlogs"), postData)
    }
}

export async function publishBlog(id, postData) {
    const existingPost = await getDoc(doc(db, "publishedBlogs", id))
    const existingPostData = existingPost.data()
    if(existingPostData) delete postData.timestamp
    return setDoc(doc(db, "publishedBlogs", id), postData, { merge: true })
}

export async function deleteBlogPost(id) {
    await deleteDoc(doc(db, "publishedBlogs", id))
    return deleteDoc(doc(db, "savedBlogs", id))
}