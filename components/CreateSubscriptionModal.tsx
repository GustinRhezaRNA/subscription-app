import React, { useState, useMemo } from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from 'react-native';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { icons } from '@/constants/icons';

interface CreateSubscriptionModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (subscription: any) => void;
}

const CATEGORIES = [
    'Entertainment',
    'AI Tools',
    'Developer Tools',
    'Design',
    'Productivity',
    'Cloud',
    'Music',
    'Other',
];

const CATEGORY_COLORS: Record<string, string> = {
    'Entertainment': '#ff9a9e',
    'AI Tools': '#a18cd1',
    'Developer Tools': '#fbc2eb',
    'Design': '#84fab0',
    'Productivity': '#8fd3f4',
    'Cloud': '#fccb90',
    'Music': '#e0c3fc',
    'Other': '#d4fc79',
};

export default function CreateSubscriptionModal({
    visible,
    onClose,
    onSubmit,
}: CreateSubscriptionModalProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [frequency, setFrequency] = useState<'Monthly' | 'Yearly'>('Monthly');
    const [category, setCategory] = useState('Entertainment');

    const isValid = useMemo(() => {
        const parsedPrice = parseFloat(price);
        return name.trim() !== '' && !isNaN(parsedPrice) && parsedPrice > 0;
    }, [name, price]);

    const handleSubmit = () => {
        if (!isValid) return;

        const startDate = new Date().toISOString();
        const renewalDate =
            frequency === 'Monthly'
                ? dayjs().add(1, 'month').toISOString()
                : dayjs().add(1, 'year').toISOString();

        const newSubscription = {
            id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
            name,
            price: parseFloat(price),
            frequency,
            category,
            status: 'active',
            startDate,
            renewalDate,
            icon: icons.wallet,
            billing: frequency,
            color: CATEGORY_COLORS[category] || '#d4fc79',
            currency: 'USD',
            plan: '',
            paymentMethod: '',
        };

        onSubmit(newSubscription);
        handleClose();
    };

    const handleClose = () => {
        setName('');
        setPrice('');
        setFrequency('Monthly');
        setCategory('Entertainment');
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={handleClose}
        >
            <View className="modal-overlay">
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    className="flex-1 justify-end"
                >
                    <View className="modal-container">
                        <View className="modal-header">
                            <Text className="modal-title">New Subscription</Text>
                            <Pressable className="modal-close" onPress={handleClose}>
                                <Text className="modal-close-text">X</Text>
                            </Pressable>
                        </View>

                        <ScrollView className="modal-body" contentContainerClassName="gap-5 pb-10">
                            {/* Name Input */}
                            <View>
                                <Text className="auth-label mb-2">Name</Text>
                                <TextInput
                                    className="auth-input"
                                    placeholder="e.g. Spotify"
                                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            {/* Price Input */}
                            <View>
                                <Text className="auth-label mb-2">Price</Text>
                                <TextInput
                                    className="auth-input"
                                    placeholder="0.00"
                                    placeholderTextColor="rgba(0, 0, 0, 0.4)"
                                    keyboardType="decimal-pad"
                                    value={price}
                                    onChangeText={setPrice}
                                />
                            </View>

                            {/* Frequency Picker */}
                            <View>
                                <Text className="auth-label mb-2">Frequency</Text>
                                <View className="picker-row">
                                    {(['Monthly', 'Yearly'] as const).map((freq) => (
                                        <Pressable
                                            key={freq}
                                            className={clsx(
                                                'picker-option',
                                                frequency === freq && 'picker-option-active'
                                            )}
                                            onPress={() => setFrequency(freq)}
                                        >
                                            <Text
                                                className={clsx(
                                                    'picker-option-text',
                                                    frequency === freq && 'picker-option-text-active'
                                                )}
                                            >
                                                {freq}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Category Picker */}
                            <View>
                                <Text className="auth-label mb-2">Category</Text>
                                <View className="category-scroll">
                                    {CATEGORIES.map((cat) => (
                                        <Pressable
                                            key={cat}
                                            className={clsx(
                                                'category-chip',
                                                category === cat && 'category-chip-active'
                                            )}
                                            onPress={() => setCategory(cat)}
                                        >
                                            <Text
                                                className={clsx(
                                                    'category-chip-text',
                                                    category === cat && 'category-chip-text-active'
                                                )}
                                            >
                                                {cat}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>
                            </View>

                            {/* Submit Button */}
                            <Pressable
                                className={clsx(
                                    'auth-button mt-4',
                                    !isValid && 'auth-button-disabled'
                                )}
                                onPress={handleSubmit}
                                disabled={!isValid}
                            >
                                <Text className="auth-button-text text-white">Create Subscription</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>
    );
}
