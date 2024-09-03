import React from 'react';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Center,
  Divider,
  Heading,
  Image,
  Stack,
  Flex,
  Button,
  ButtonGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  HStack,
  VStack,
  Spacer,
} from '@chakra-ui/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MemberCard = ({ member, fileUrl, onEdit, onDelete }) => {
  return (
    <Card
      width='80vw'
      borderWidth='1px'
      borderRadius='lg'
      overflow='hidden'
      boxShadow='lg'
      bg='gray.800'
      color='white'
      mb='4'
    >
      <CardBody>
        {/* Name and Image */}
        <Center>
        <VStack spacing={4} align='start'>
          
          <Heading size='md' color='yellow.300'>
            {member.name}
          </Heading>
          <Heading size='sm' color='yellow.200'>
            Member Details
          </Heading>
          
        </VStack>
        </Center>

        <HStack spacing={4} mt='4'>
          {/* Image Section */}
          <Center flex='1'>
            <Image
              src={fileUrl || '/default-profile-picture.png'}
              alt='Profile'
              boxSize='250px'
              objectFit='contain'
              border='2px solid yellow'
            />
          </Center>

          {/* Table Section */}
          <HStack spacing={4} flex='3'>
            <Box
              p={4}
              borderRadius='md'
              bg='gray.700'
              border='1px solid gray.600'
              flex='1'
            >
              <Table variant='unstyled'>
                <Tbody>
                  <Tr>
                    <Th color='yellow.300'>Email:</Th>
                    <Td>{member.email}</Td>
                  </Tr>
                  <Tr>
                    <Th color='yellow.300'>Phone:</Th>
                    <Td>{member.phone}</Td>
                  </Tr>
                  <Tr>
                    <Th color='yellow.300'>Date of Joining:</Th>
                    <Td>{new Date(member.doj).toLocaleDateString()}</Td>
                  </Tr>
                  <Tr>
                    <Th color='yellow.300'>Date of Birth:</Th>
                    <Td>{new Date(member.dob).toLocaleDateString()}</Td>
                  </Tr>

                  <Tr>
                    <Th color='yellow.300'>Payment:</Th>
                    <Td>{member.payment}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>

            <Box
              p={4}
              borderRadius='md'
              bg='gray.700'
              border='1px solid gray.600'
              flex='1'
            >
              <Table variant='unstyled'>
               
                <Tbody>
                  
                  <Tr>
                    <Th color='yellow.300'>Payment Method:</Th>
                    <Td>{member.paymentmethod}</Td>
                  </Tr>
                  <Tr>
                    <Th color='yellow.300'>Batch:</Th>
                    <Td>{member.batch}</Td>
                  </Tr>
                  <Tr>
                    <Th color='yellow.300'>Goal:</Th>
                    <Td>{member.goal}</Td>
                  </Tr>
                  <Tr>
                    <Th color='yellow.300'>Months:</Th>
                    <Td>{member.months}</Td>
                  </Tr>
                  <Tr>
                    <Th color='yellow.300'>Date of Expiry:</Th>
                    <Td>{new Date(member.doe).toLocaleDateString()}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </Box>
          </HStack>
        </HStack>
      </CardBody>

      <Divider borderColor='gray.600' />

      <CardFooter>
  <Flex width='100%' alignItems='center' gap='4'>
    <Button
      variant='solid'
      colorScheme='yellow'
      onClick={() => onEdit(member)}
    >
      <FaEdit /> Edit
    </Button>
  
    <Button
      variant='outline'
      colorScheme='red'
      onClick={() => onDelete(member)}
    >
      <FaTrash /> Delete
    </Button>
    <Spacer />
    <Button
      as='a'
      href={`mailto:${member.email}`}
      variant='solid'
      colorScheme='teal'
      leftIcon={<FaEdit />}
    >
      Email
    </Button>
    <Button
      as='a'
      href={`tel:${member.phone}`}
      variant='solid'
      colorScheme='teal'
      leftIcon={<FaEdit />}
    >
      Call
    </Button>
  </Flex>
</CardFooter>

    </Card>
  );
};

export default MemberCard;
