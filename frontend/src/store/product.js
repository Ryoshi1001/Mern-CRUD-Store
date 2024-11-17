import { create } from 'zustand'

//global state with zustand
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({products}),  
  //adding function to add product also 
  createProduct: async (newProduct) => {
    if(!newProduct.name || !newProduct.price || !newProduct.image){
      return {success:false, message: "Please fill in all fields"}
    }

    const res = await fetch("/api/products", {
      method: "POST", 
      headers:{
        "Content-Type":"application/json"
      }, 
      body:JSON.stringify(newProduct)
    }); 

    const data = await res.json();

    set((state) => ({products:[...state.products, data.data]}))
    return { success: true, message: "Product added Successfully"}
  }, 
  fetchProducts: async () => {
    const res = await fetch("/api/products")
    const data = await res.json(); 
    set({ products: data.data})
  }, 
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",  
    }); 
    const data = await res.json(); 

    if(!data.success){
      return { success: false, message: data.message}
    }
    //this set updates the UI in real time without page refresh
    set(state => ({ products: state.products.filter(product => product._id !== pid) }))

    return {success: true, message: data.message}
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT", 
      headers: {
        "Content-Type": "application/json", 
      }, 
      body: JSON.stringify(updatedProduct),
    }); 
    const data = await res.json(); 
    
    if(!data.success) {
      return {success: false, message: data.message}
    }

    //this updates the UI without refreshing the screen
    set((state) => ({products: state.products.map((product) => (product._id === pid ? data.data : product))}))


    console.log("updatedProduct function: product updated" )
    return {success: true, message: "Product updated successfully"}
  }
})); 

//example of local state using useState()
// const [state, setState] = useState([])
