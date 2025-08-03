import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { useState } from "react";
import {
  Form,
  Select,
  InputNumber,
  Button,
  Table,
  Modal,
  Tabs,
  Badge,
} from "antd";

const { TabPane } = Tabs;

interface Product {
  id: string;
  name: string;
  price: number;
}

export default function Promotions() {
  const [form] = Form.useForm();
  const [loading] = useState(false);
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);

  // Table columns for submissions
  const submissionColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products: Product[]) => products.map((p) => p.name).join(", "),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Badge
          status={
            status === "approved"
              ? "success"
              : status === "rejected"
              ? "error"
              : "processing"
          }
          text={status.charAt(0).toUpperCase() + status.slice(1)}
        />
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <>
      <PageMeta
        title="AY Developers - Promotions"
        description="Manage your sales and promotions"
      />
      <PageBreadcrumb pageTitle="Promotions" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <Tabs defaultActiveKey="submit">
          <TabPane tab="Submit Sale" key="submit">
            <Form form={form} layout="vertical" className="max-w-2xl mx-auto">
              <Form.Item
                name="products"
                label="Select Products"
                rules={[{ required: true, message: "Please select products" }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select products"
                  className="w-full"
                  optionFilterProp="children"
                >
                  {/* Add product options here */}
                </Select>
              </Form.Item>

              <Form.Item
                name="quantity"
                label="Quantity"
                rules={[{ required: true, message: "Please enter quantity" }]}
              >
                <InputNumber min={1} className="w-full" />
              </Form.Item>

              <Form.Item className="mb-0">
                <Button
                  type="primary"
                  onClick={() => setPaymentModalVisible(true)}
                  loading={loading}
                  className="w-full"
                >
                  Make Payment
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="Pending" key="pending">
            <Table
              columns={submissionColumns}
              dataSource={[]}
              rowKey="id"
              loading={loading}
            />
          </TabPane>

          <TabPane tab="Approved" key="approved">
            <Table
              columns={submissionColumns}
              dataSource={[]}
              rowKey="id"
              loading={loading}
            />
          </TabPane>

          <TabPane tab="Rejected" key="rejected">
            <Table
              columns={submissionColumns}
              dataSource={[]}
              rowKey="id"
              loading={loading}
            />
          </TabPane>
        </Tabs>
      </div>

      {/* Payment Modal */}
      <Modal
        title="Make Payment"
        open={paymentModalVisible}
        onCancel={() => setPaymentModalVisible(false)}
        footer={null}
      >
        <div className="p-4">
          {/* Add payment form here */}
          <Button type="primary" className="w-full mt-4" loading={loading}>
            Confirm Payment
          </Button>
        </div>
      </Modal>
    </>
  );
}
