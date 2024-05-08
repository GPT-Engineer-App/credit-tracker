import React, { useState } from "react";
import { Box, Button, Container, FormControl, FormLabel, Input, NumberInput, NumberInputField, VStack, Text, List, ListItem, IconButton, useToast } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaDollarSign } from "react-icons/fa";

const Index = () => {
  const [expenses, setExpenses] = useState([]);
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const toast = useToast();

  const handleAddExpense = () => {
    if (email === "" || amount === "") {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const existingExpenseIndex = expenses.findIndex((exp) => exp.email === email);
    if (existingExpenseIndex !== -1) {
      const updatedExpenses = expenses.map((exp, index) => {
        if (index === existingExpenseIndex) {
          return { ...exp, amount: exp.amount + parseFloat(amount) };
        }
        return exp;
      });
      setExpenses(updatedExpenses);
    } else {
      setExpenses([...expenses, { email, amount: parseFloat(amount) }]);
    }
    setEmail("");
    setAmount("");
  };

  const handleDeleteExpense = (index) => {
    const newExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(newExpenses);
  };

  const handleSettleUp = () => {
    // This would be more complex in a real app, involving backend calculations
    setExpenses([]);
    toast({
      title: "Settled up",
      description: "All balances have been cleared",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={4} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">
          Friend Credit Tracker
        </Text>
        <FormControl>
          <FormLabel>Email address</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        </FormControl>
        <FormControl>
          <FormLabel>Amount</FormLabel>
          <NumberInput precision={2} min={0}>
            <NumberInputField value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
          </NumberInput>
        </FormControl>
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={handleAddExpense}>
          Add Expense
        </Button>
        <List spacing={3}>
          {expenses.map((expense, index) => (
            <ListItem key={index} d="flex" justifyContent="space-between" alignItems="center">
              {expense.email}: ${expense.amount.toFixed(2)}
              <IconButton aria-label="Delete expense" icon={<FaTrash />} onClick={() => handleDeleteExpense(index)} />
            </ListItem>
          ))}
        </List>
        {expenses.length > 0 && (
          <Button leftIcon={<FaDollarSign />} colorScheme="green" onClick={handleSettleUp}>
            Settle Up
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
