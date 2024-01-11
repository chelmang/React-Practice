import React, { useState } from "react";
import styled from "styled-components";
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    Modal,
    Backdrop,
    Fade,
} from "@mui/material";


const MainContainer = styled.div`
  background-color: whitesmoke; 
  padding: 20px;
  min-height: 100vh; 
  box-sizing: border-box;
`;

const MainTitleText = styled.p`
  font-size: 40px;
  text-align: center;
  color: #333;
  margin-bottom: 70px;
  font-weight: bold;
`;

const SearchSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  margin-left: 30px; 
 
`;

const SearchLabel = styled("label")`
  font-size: 16px;
  margin-bottom: 5px;
  font-weight: bold;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 20px;
`;

const AddProductButton = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    margin-left: 10px;
`;

const ModalContent = styled(Paper)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  background-color: #fff;
`;

const TableHeaderCell = styled(TableCell)`
  background-color: #c0c0c0; 
  color: #fff; 
`;

const SearchResultText = styled.p`
    margin-left: 10px; 
`;

const StyledTableContainer = styled(TableContainer)`
  max-height: 500px; 
  overflow-y: auto;
  margin-top: 20px; 
`;


const Products = () => {
    const [products, setProducts] = useState([
        {
            id: 1,
            category: "회원권 카테고리 1",
            name: "회원권 1",
            duration: "1개월",
            sessions: 10,
            amount: 100000,
            status: "사용중",
        },
        {
            id: 2,
            category: "회원권 카테고리 2",
            name: "회원권 2",
            duration: "3개월",
            sessions: 20,
            amount: 200000,
            status: "사용종료",
        },
    ]);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortCriteria, setSortCriteria] = useState("latest");
    const [statusCriteria, setStatusCriteria] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [newProductData, setNewProductData] = useState({
        category: "",
        name: "",
        duration: "",
        sessions: 0,
        amount: 0,
    });

    const handleSearchTermChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSortCriteriaChange = (event) => {
        setSortCriteria(event.target.value);
    };

    const handleStatusCriteriaChange = (event) => {
        setStatusCriteria(event.target.value);
    };

    const handleProductClick = (productId) => {
        setSelectedProduct(productId);
    };

    const handleMenuClick = (action) => {
        if (selectedProduct) {
            if (action === "삭제") {
                const updatedProducts = products.filter((product) => product.id !== selectedProduct);
                setProducts(updatedProducts);
            } else if (action === "수정") {
                const updatedProducts = products.map((product) =>
                    product.id === selectedProduct ? { ...product, name: `${product.name} (수정됨)`, status: "수정됨" } : product
                );
                setProducts(updatedProducts);
            } else if (action === "사용종료") {
                const updatedProducts = products.map((product) =>
                    product.id === selectedProduct ? { ...product, status: "사용종료" } : product
                );
                setProducts(updatedProducts);
            }

            setSelectedProduct(null);
        }
    };

    const handleAddProductClick = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleAddProductModalSubmit = () => {
        const newProduct = {
            id: products.length + 1,
            category: newProductData.category,
            name: newProductData.name,
            duration: newProductData.duration,
            sessions: newProductData.sessions,
            amount: newProductData.amount,
            status: "사용중",
        };
        setProducts([...products, newProduct]);

        setShowModal(false);
    };

    return (
        <MainContainer>
            <MainTitleText>상품 관리</MainTitleText>

            <SearchSection>
                <SearchLabel htmlFor="search">검색:</SearchLabel>
                <TextField
                    id="search"
                    label="검색"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchTermChange}
                    sx={{ minWidth: 300 }}
                />
                <TextField
                    select
                    label="정렬 기준"
                    variant="outlined"
                    value={sortCriteria}
                    onChange={handleSortCriteriaChange}
                    sx={{ minWidth: 150 }}
                >
                    <option value="latest">최신 등록순</option>
                    <option value="oldest">오래된 순</option>
                </TextField>
                <TextField
                    select
                    label="상태"
                    variant="outlined"
                    value={statusCriteria}
                    onChange={handleStatusCriteriaChange}
                    sx={{ minWidth: 150 }}
                >
                    <option value="all">전체</option>
                    <option value="inUse">사용중</option>
                    <option value="expired">사용종료</option>
                </TextField>
            </SearchSection>

            <SearchResultText>총 {products.length}개의 결과가 검색되었습니다.</SearchResultText>

            <StyledTableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableHeaderCell>No</TableHeaderCell>
                            <TableHeaderCell>회원권 카테고리</TableHeaderCell>
                            <TableHeaderCell>회원권명</TableHeaderCell>
                            <TableHeaderCell>사용기간</TableHeaderCell>
                            <TableHeaderCell>세션</TableHeaderCell>
                            <TableHeaderCell>금액</TableHeaderCell>
                            <TableHeaderCell>상태</TableHeaderCell>
                            <TableHeaderCell>메뉴</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRow key={product.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell onClick={() => handleProductClick(product.id)}>{product.name}</TableCell>
                                <TableCell>{product.duration}</TableCell>
                                <TableCell>{product.sessions}</TableCell>
                                <TableCell>{product.amount}</TableCell>
                                <TableCell>{product.status}</TableCell>
                                <TableCell>
                                    <ActionButtons>
                                        <Button variant="contained" color="info" onClick={() => handleMenuClick("사용종료")}>
                                            사용종료
                                        </Button>
                                        <Button variant="contained" color="info" onClick={() => handleMenuClick("수정")}>
                                            수정
                                        </Button>
                                        <Button variant="contained" color="info" onClick={() => handleMenuClick("삭제")}>
                                            삭제
                                        </Button>
                                    </ActionButtons>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </StyledTableContainer>

            <AddProductButton>
                <Button variant="contained" onClick={handleAddProductClick}>
                    상품 추가
                </Button>
            </AddProductButton>

            <Modal open={showModal} onClose={handleModalClose} closeAfterTransition BackdropComponent={Backdrop}>
                <Fade in={showModal}>
                    <ModalContent>
                        <h2>상품 추가</h2>
                        <TextField
                            label="카테고리"
                            variant="outlined"
                            value={newProductData.category}
                            onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="상품명"
                            variant="outlined"
                            value={newProductData.name}
                            onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="사용기간"
                            variant="outlined"
                            value={newProductData.duration}
                            onChange={(e) => setNewProductData({ ...newProductData, duration: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="세션"
                            variant="outlined"
                            type="number"
                            value={newProductData.sessions}
                            onChange={(e) => setNewProductData({ ...newProductData, sessions: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <TextField
                            label="금액"
                            variant="outlined"
                            type="number"
                            value={newProductData.amount}
                            onChange={(e) => setNewProductData({ ...newProductData, amount: e.target.value })}
                            fullWidth
                            sx={{ marginBottom: 2 }}
                        />
                        <Button variant="contained" onClick={handleAddProductModalSubmit}>
                            추가
                        </Button>
                    </ModalContent>
                </Fade>
            </Modal>
        </MainContainer>
    );
};

export default Products;
