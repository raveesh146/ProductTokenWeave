import { describe, it, expect, beforeEach, vi } from 'vitest';
import { getTwitterData } from '../TwitterService';
import { TwitterApi } from 'twitter-api-v2';

// Mock the twitter-api-v2 module
vi.mock('twitter-api-v2');

// Mock the config module with a default bearer token
vi.mock('../config/env', () => ({
  config: {
    TWITTER_BEARER_TOKEN: 'mock-token'
  }
}));

describe('TwitterService', () => {
  const mockTwitterApi = {
    v2: {
      userByUsername: vi.fn(),
      userTimeline: vi.fn()
    }
  };

  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Setup the mock implementation
    vi.mocked(TwitterApi).mockImplementation(() => mockTwitterApi as any);
  });

  it('should fetch and format Twitter data correctly', async () => {
    // Mock the API responses
    mockTwitterApi.v2.userByUsername.mockResolvedValue({
      data: {
        id: '123456',
        name: 'Test User',
        description: 'Test bio',
        public_metrics: {
          followers_count: 1000
        }
      }
    });

    mockTwitterApi.v2.userTimeline.mockResolvedValue({
      data: {
        data: [
          { text: 'Tweet 1' },
          { text: 'Tweet 2' }
        ]
      }
    });

    const result = await getTwitterData('@speed_gul');

    // Verify the result
    expect(result).toEqual({
      profile: {
        name: 'Test User',
        bio: 'Test bio',
        followers: 1000
      },
      tweets: ['Tweet 1', 'Tweet 2']
    });

    // Verify API calls
    expect(mockTwitterApi.v2.userByUsername).toHaveBeenCalledWith('speed_gul', {
      'user.fields': ['description', 'public_metrics']
    });
    expect(mockTwitterApi.v2.userTimeline).toHaveBeenCalledWith('123456', {
      max_results: 10,
      exclude: ['retweets', 'replies']
    });
  });

  it('should handle user not found error', async () => {
    mockTwitterApi.v2.userByUsername.mockResolvedValue({ data: null });

    await expect(getTwitterData('@speed_gul')).rejects.toThrow(
      'Twitter user speed_gul not found'
    );
  });

  it('should handle missing bearer token', async () => {
    // Re-mock the config module with undefined token
    vi.mock('../config/env', () => ({
      config: {
        TWITTER_BEARER_TOKEN: undefined
      }
    }));

    await expect(getTwitterData('@speed_gul')).rejects.toThrow(
      'Twitter Bearer Token is not configured'
    );
  });

  it('should handle API errors', async () => {
    mockTwitterApi.v2.userByUsername.mockRejectedValue(new Error('API Error'));

    await expect(getTwitterData('@speed_gul')).rejects.toThrow(
      'Failed to fetch Twitter data: API Error'
    );
  });
}); 