import { renderHook } from '@testing-library/react-hooks';
import { useQuery } from '@tanstack/react-query';
import { useAnimalsQuery } from './useAnimalsQuery';

// Mock the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ image: 'mocked_image_url' }),
  })
);

// Mock the useQuery hook to return a mocked response
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

describe('useAnimalsQuery', () => {
  it('should handle loading state correctly', async () => {
    // Mock the useQuery hook response with isLoading=true
    useQuery.mockReturnValue({
      isLoading: true,
      refetch: jest.fn(),
    });

    // Render the hook
    const { result } = renderHook(() => useAnimalsQuery({ enabled: true }));

    // Check if isLoading is true
    expect(result.current.isLoading).toBe(true);
  });

  it('should fetch and return animals data', async () => {
    // Define mocked data
    const mockedFoxData = { image: 'fox_image_url', type: 'fox' };
    const mockedDogData = [
      { url: 'dog_image_url_1', type: 'dog' },
      { url: 'dog_image_url_2', type: 'dog' },
      { url: 'dog_image_url_3', type: 'dog' },
      { url: 'dog_image_url_4', type: 'dog' },
    ];
    const mockedCatData = [
      { url: 'cat_image_url_1', type: 'cat' },
      { url: 'cat_image_url_2', type: 'cat' },
      { url: 'cat_image_url_3', type: 'cat' },
      { url: 'cat_image_url_4', type: 'cat' },
    ];

    // Mock the useQuery hook response
    useQuery.mockReturnValue({
      data: [mockedFoxData, ...mockedDogData, ...mockedCatData],
      isLoading: false,
      refetch: jest.fn(),
    });

    // Render the hook
    const { result, waitFor } = renderHook(() =>
      useAnimalsQuery({ enabled: true })
    );

    // Wait for the hook to finish loading
    await waitFor(() => result.current.isSuccess);

    // Check if the hook returned the expected data
    expect(result.current.data).toEqual([
      mockedFoxData,
      ...mockedDogData,
      ...mockedCatData,
    ]);
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle error state correctly', async () => {
    // Mock the useQuery hook response with isError=true
    useQuery.mockReturnValue({
      isError: true,
      refetch: jest.fn(),
    });

    // Render the hook
    const { result, waitFor } = renderHook(() =>
      useAnimalsQuery({ enabled: true })
    );

    // Wait for the hook to finish loading
    await waitFor(() => result.current.isError);

    // Check if isError is true
    expect(result.current.isError).toBe(true);
  });
});
