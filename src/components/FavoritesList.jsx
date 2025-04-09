import { Box, VStack, Text, IconButton, useColorModeValue } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export const FavoritesList = ({ favorites, onSelect, onRemove }) => {
  const bgColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.600');
  const textColor = useColorModeValue('gray.800', 'white');

  if (!favorites.length) {
    return (
      <Box
        p={4}
        bg={bgColor}
        borderRadius="lg"
        textAlign="center"
        role="status"
        aria-label="No favorite locations"
      >
        <Text color={textColor}>No favorite locations yet</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={2} w="100%" maxW="600px">
      {favorites.map((favorite) => (
        <MotionBox
          key={favorite.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          w="100%"
        >
          <Box
            p={4}
            bg={bgColor}
            borderRadius="lg"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            cursor="pointer"
            onClick={() => onSelect(favorite)}
            role="button"
            aria-label={`Select ${favorite.name} weather`}
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'md',
            }}
            transition="all 0.2s"
          >
            <Text color={textColor} fontWeight="medium">
              {favorite.name}, {favorite.country}
            </Text>
            <IconButton
              icon={<StarIcon color="yellow.400" />}
              variant="ghost"
              aria-label={`Remove ${favorite.name} from favorites`}
              onClick={(e) => {
                e.stopPropagation();
                onRemove(favorite.id);
              }}
              size="sm"
            />
          </Box>
        </MotionBox>
      ))}
    </VStack>
  );
}; 