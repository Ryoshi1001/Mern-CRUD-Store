import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useProductStore } from '../store/product';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate(); 
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });
  const toast = useToast()

  const {createProduct} = useProductStore()

  const handleAddProduct = async () => {
   const {success, message} = await createProduct(newProduct)
    console.log('product added', newProduct)
    console.log("success", success), 
    console.log("message", message)
    if(!success) {
      toast({
        title: "Error", 
        description: message, 
        status: "error", 
        duration: 3000, 
        isClosable: true, 
      })
    } else {
      toast({
        title: "Product Added Successfully", 
        description: message, 
        status: 'success', 
        duration: 3000, 
        isClosable: true, 
      })
    }
    setNewProduct({name: "", price: '', image: ''})
    navigate("/")
  }

  return (
    <Container maxW={'container.sm'}>
      <VStack spacing={8}>
        <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>Create New Product</Heading>

        <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        p={6}
        rounded={'lg'}
        shadow={'md'}
        >
          <VStack spacing={4}>
            <Input
            placeholder='Product Name'
            name='name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
            />
            <Input
            placeholder='Price'
            name='price'
            type='number'
            value={newProduct.price}
            onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
            />
            <Input
            placeholder='Image URL'
            name='image'
            value={newProduct.image}
            onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
            />
          </VStack>
          <Button
          w={'full'}
          mt={4}
          bg={'cyan.400'}
          onClick={handleAddProduct}
          >Add Product</Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
