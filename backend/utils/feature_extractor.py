import re
import numpy as np
from textblob import TextBlob

class AdvancedFeatureExtractor:
    def __init__(self):
        self.positive_words = ['love', 'miss', 'care', 'adore', 'amazing', 'wonderful', 'perfect', 'happy']
        self.negative_words = ['hate', 'annoying', 'bored', 'tired', 'stop', 'leave', 'whatever', 'done']
        self.ambiguous_words = ['maybe', 'perhaps', 'idk', 'not sure', 'busy', 'later', 'whatever', 'guess']
    
    def extract_all_features(self, text):
        """Extract comprehensive features for ML model"""
        features = {}
        
        # Basic text features
        features.update(self._extract_basic_features(text))
        
        # Emotional features
        features.update(self._extract_emotional_features(text))
        
        # Linguistic features
        features.update(self._extract_linguistic_features(text))
        
        # Context features
        features.update(self._extract_context_features(text))
        
        return features
    
    def _extract_basic_features(self, text):
        """Extract basic text statistics"""
        return {
            'char_count': len(text),
            'word_count': len(text.split()),
            'sentence_count': len(re.split(r'[.!?]+', text)),
            'avg_word_length': np.mean([len(word) for word in text.split()]) if text.split() else 0,
            'unique_word_ratio': len(set(text.split())) / len(text.split()) if text.split() else 0
        }
    
    def _extract_emotional_features(self, text):
        """Extract emotional indicators"""
        text_lower = text.lower()
        
        # Emoji analysis
        heart_emojis = len(re.findall(r'[❤️💕💖💗💓💞💘💝]', text))
        happy_emojis = len(re.findall(r'[😊😄😁😂🤣😍🥰😘]', text))
        sad_emojis = len(re.findall(r'[😔😞😢😭💔😩😠]', text))
        neutral_emojis = len(re.findall(r'[😐😶😑]', text))
        
        # Punctuation analysis
        exclamation_count = text.count('!')
        question_count = text.count('?')
        ellipsis_count = text.count('...')
        
        # Keyword analysis
        positive_count = sum(1 for word in self.positive_words if word in text_lower)
        negative_count = sum(1 for word in self.negative_words if word in text_lower)
        ambiguous_count = sum(1 for word in self.ambiguous_words if word in text_lower)
        
        return {
            'heart_emojis': heart_emojis,
            'happy_emojis': happy_emojis,
            'sad_emojis': sad_emojis,
            'neutral_emojis': neutral_emojis,
            'exclamation_count': exclamation_count,
            'question_count': question_count,
            'ellipsis_count': ellipsis_count,
            'positive_word_count': positive_count,
            'negative_word_count': negative_count,
            'ambiguous_word_count': ambiguous_count,
            'emotional_intensity': (positive_count + negative_count) / len(text.split()) if text.split() else 0
        }
    
    def _extract_linguistic_features(self, text):
        """Extract linguistic complexity features"""
        try:
            blob = TextBlob(text)
            return {
                'sentiment_polarity': blob.sentiment.polarity,
                'sentiment_subjectivity': blob.sentiment.subjectivity,
                'readability_score': self._calculate_readability(text)
            }
        except:
            return {
                'sentiment_polarity': 0,
                'sentiment_subjectivity': 0,
                'readability_score': 0
            }
    
    def _extract_context_features(self, text):
        """Extract conversation context features"""
        text_lower = text.lower()
        
        # Personal connection indicators
        personal_pronouns = len(re.findall(r'\b(i|you|we|us|our|me)\b', text_lower))
        future_tense = len(re.findall(r'\b(will|going to|gonna|plan|future)\b', text_lower))
        past_tense = len(re.findall(r'\b(was|were|did|had)\b', text_lower))
        
        # Urgency indicators
        urgent_words = len(re.findall(r'\b(now|asap|immediately|urgent|important)\b', text_lower))
        
        return {
            'personal_pronouns': personal_pronouns,
            'future_tense': future_tense,
            'past_tense': past_tense,
            'urgent_words': urgent_words,
            'personal_connection': personal_pronouns / len(text.split()) if text.split() else 0
        }
    
    def _calculate_readability(self, text):
        """Simple readability score"""
        words = text.split()
        sentences = re.split(r'[.!?]+', text)
        
        if len(words) == 0 or len(sentences) == 0:
            return 0
            
        avg_sentence_length = len(words) / len(sentences)
        avg_word_length = sum(len(word) for word in words) / len(words)
        
        # Simple readability formula
        return 206.835 - 1.015 * avg_sentence_length - 84.6 * (avg_word_length / 100)