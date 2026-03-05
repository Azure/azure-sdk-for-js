from sample_client import EmptyClient


def main() -> None:
    client = EmptyClient()
    widgets = client.widgets.list_widgets()
    print(len(widgets))


if __name__ == "__main__":
    main()
