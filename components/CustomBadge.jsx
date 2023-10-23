'use client';
import { Badge } from '@chakra-ui/react';

function CustomBadge({ children }) {
  return (
    <Badge
      sx={{
        display: 'flex',
        borderRadius: '5px',
        position: 'absolute',
        top: -3.5,
        left: { base: 4, md: 7 },
      }}
    >
      {children}
    </Badge>
  );
}

export default CustomBadge;
